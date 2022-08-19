import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { useFormik } from 'formik';
import { required, maxLengthCreator } from './../../../utils/validators/validators.js';

let maxLength10 = maxLengthCreator(10);

const MyPosts = function(props) {
    let postsElements = props.posts.map( elem => <Post date={elem.date} message={elem.text} likeCount={elem.likeCount} key={elem.id} /> );
    let onAddPost = (value) => {
        props.addPost(value);
    };
    
    return <div>
        <div className={classes.content} >
            <AddPostForm onAddPost={onAddPost} />
        </div>
        <div>
            <h3>My posts</h3>
            <div className={classes.postsList} >{postsElements}</div>
        </div>
    </div>
};

const validate = values => {
    let errors = {};
    if (!values.newPostText) {
        errors.newPostText = 'Нельзя публиковать пустой пост';
    } else if (values.newPostText.length > 10) {
        errors.newPostText = 'максимум 10 символов';
    }
    return errors;
}
const AddPostForm = (props) => {
    const formik = useFormik({
        initialValues: {
            newPostText: '',
        },
        validate, 
        onSubmit: (values, actions) => {
            props.onAddPost(values.newPostText);
            actions.resetForm({
                newPostText: '',                                   
            });
        } 
    });

    return <form onSubmit={formik.handleSubmit}>
        <textarea name={'newPostText'}  
                  id={'newPostText'}
                  placeholder={'Напишите что-нибудь'}
                  value={formik.values.newPostText}
                  validate={[required, maxLength10]} 
                  onChange={formik.handleChange}
        /> 
        <button type={'submit'} disabled={formik.errors.newPostText}>Опубликовать</button> 
        {formik.errors.newPostText ? <span>{formik.errors.newPostText}</span> : null}
    </form>
}

export default MyPosts;
