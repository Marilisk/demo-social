import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import AddPostForm from './AddPostForm';

const MyPosts = function ({ addPost, posts, pressLike, deletePost }) {

    let postsElements = posts.map(elem => {
        let date = new Date(Date.parse(elem.date)).toLocaleString("ru", { day: "numeric", month: 'long', year: 'numeric' });
        return <Post date={date}
            message={elem.text}
            count={elem.likeCount}
            pressLike={pressLike}
            postId={elem.id}
            deletePost={deletePost}
            key={elem.id} />
    })

    return <div>
        <div className={classes.content} >
            <h2>Мои посты</h2>
            <AddPostForm onAddPost={addPost} />
        </div>
        <div>
            <div className={classes.postsList} >{postsElements}</div>
        </div>
    </div>
};

export default MyPosts;
