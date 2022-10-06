import React from 'react';
import c from './Post.module.css';
import Ava from './../../../../images/default_Avatar.jpg';
import likes from './../../../../images/myPage/posts/likes.svg';
import like from './../../../../images/myPage/posts/like.svg';
import trash from './../../../../images/myPage/posts/trash.svg';

const Post = function ({ date, message, count, pressLike, postId, deletePost }) {

    return <div className={c.item}>
        <div className={c.twoCol}>
            <div className={c.postAvaWrapper}>
                <img className={c.postAvaImg} alt='defaultAva' src={Ava} />
            </div>
            <p className={c.date}>{date}</p>
            <div className={c.like}>

                <div className={c.iconWrapper}>
                    <img className={c.likesIcon} alt='' src={likes} />
                </div>
                <span>{count}</span>
                <div className={c.iconWrapper} onClick={() => pressLike(postId)} >
                    <img className={c.likeIcon} alt='' src={like} />
                </div>
            </div>
            <div className={c.trashIconWrapper} onClick={() => deletePost(postId)} >
            <img className={c.trashIcon} alt='' src={trash} />
        </div>
        </div>
        <p className={c.postText}>{message}</p>

        {/* <div className={c.trashIconWrapper} onClick={() => pressLike(postId)} >
            <img className={c.trashIcon} alt='' src={trash} />
        </div> */}


    </div>

};


export default Post;
