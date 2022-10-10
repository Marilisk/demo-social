import React, { useState } from "react";
import classes from './MyPage.module.css';
import defaultAvatar from './../../images/default_Avatar.jpg';
import dots from './../../images/myPage/menu-dots.svg';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePhotoThunkCreator } from '../redux/profile-reducer.js';
import briefcase from './../../images/myPage/briefcase.svg';
import geo from './../../images/myPage/marker.svg';
import note from './../../images/myPage/note.svg';
import ProfileStatusWithHooks from "../Profile/ProfileInfo/ProfileStatusWithHooks";
import EditProfileContainer from "./EditProfile/EditProfileFormContainer";
import { followThunkCreator, unFollowThunkCreator } from "../redux/users-reducer";
import Skills from "./Skills/Skills";
import { MyModal } from "./MyModal";

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



