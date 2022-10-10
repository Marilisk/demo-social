import React, { useState } from "react";
import classes from './MyPage.module.css';

export const FollowBlock = ({ userId, followingInProgress, followed, unFollow, follow }) => {

    return <div className={classes.followWrapper}>
        {followed ?
            <button disabled={followingInProgress} className={classes.followButton} onClick={() => unFollow()} >
                <span className={classes.followText}>Отписаться </span>
            </button>
            :
            <button disabled={followingInProgress} className={classes.followButton} onClick={() => follow()}>
                <span className={classes.followText}>Подписаться</span>
            </button>
        }
    </div>
}



