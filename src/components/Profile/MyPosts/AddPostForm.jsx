import React from 'react';
import classes from './MyPosts.module.css';
import { useFormik } from 'formik';


const validate = values => {
    let errors = {};
    if (!values.newPostText) {
        errors.newPostText = 'Нельзя публиковать пустой пост';
    } else if (values.newPostText.length > 100) {
        errors.newPostText = 'максимум 100 символов';
    }
    return errors;
}

const AddPostForm = ({ onAddPost }) => {

    const formik = useFormik({
        initialValues: {
            newPostText: '',
        },
        validate,
        onSubmit: (values, actions) => {
            onAddPost(values.newPostText,);
            actions.resetForm({
                newPostText: '',
            });
        }
    });

    return <div className={classes.postFormWrapper} >
        <form onSubmit={formik.handleSubmit} className={classes.postForm}>
            <div>
                <textarea name={'newPostText'}
                    id={'newPostText'}
                    placeholder={'Что у Вас нового?'}
                    value={formik.values.newPostText}
                    onChange={formik.handleChange}
                />
                {formik.errors.newPostText ?
                    <span className={classes.warning}>{formik.errors.newPostText}</span>
                    :
                    null}
            </div>
            <button type={'submit'} disabled={formik.errors.newPostText}>Опубликовать</button>

        </form>
    </div>
}

export default AddPostForm;
