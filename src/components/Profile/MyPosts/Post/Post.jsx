import React from 'react';
import classes from './Post.module.css';
import Ava from './../../../../images/default_Avatar.jpg';

const Post = function(props) {

    let show = props.message;
    let count = props.likeCount;
    let date = props.date;
    
    return <div className={classes.item}>
        <div className={classes.twoCol}>
            <div className={classes.postAvaWrapper}>
                <img className={classes.postAvaImg} alt='defaultAva' src={Ava} />
            </div>
            <p className={classes.postText}>{show}</p>
            
        </div> 
        <p className={classes.date}>{date}</p>
        <p className={classes.like}>like {count}</p>
        
        
        
    </div>
        
};


export default Post;
