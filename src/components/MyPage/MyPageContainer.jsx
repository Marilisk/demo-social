import React, { useState } from "react";
import classes from './MyPage.module.css';
import defaultAvatar from './../../images/default_Avatar.jpg';
import dots from './../../images/myPage/menu-dots.svg';
import { NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStatusThunkCreator, getUserProfileThunkCreator, savePhotoThunkCreator, setIsOwnerAC } from '../redux/profile-reducer.js';
import { useEffect } from "react";
import Preloader from "../common/preloader/preloader";
import briefcase from './../../images/myPage/briefcase.svg';
import geo from './../../images/myPage/marker.svg';
import note from './../../images/myPage/note.svg';
import ProfileStatusWithHooks from "../Profile/ProfileInfo/ProfileStatusWithHooks";
import EditProfileContainer from "./EditProfile/EditProfileFormContainer";
import { followThunkCreator, getCurrentUserThunkCreator, unFollowThunkCreator } from "../redux/users-reducer";
import Skills from "./Skills/Skills";
import MyPostsContainer from "../Profile/MyPosts/MyPostsContainer";
import { MyPage } from "./MyPage";
import { startDialogAC } from "../redux/dialogs-reducer";


const MyPageContainer = (props) => {
    const authorisedUserId = useSelector(state => state.auth.id);
    const city = useSelector(state => state.profilePage.city);
    const followers = useSelector(state => state.profilePage.followersAmount);
    const skills = useSelector(state => state.profilePage.skills);
    const profile = useSelector(state => state.profilePage.profile);
    const status = useSelector(state => state.profilePage.status);
    const followed = useSelector(state => state.usersPage.currentUser.followed);
    const currentPage = useSelector(state => state.usersPage.currentPage);

    const profileExists = (profile === undefined);

    let userId;
    let isOwner;
    const params = useParams();
    if (!params.userId) {
        userId = authorisedUserId;
    } else {
        userId = params.userId;
    }
    
    const followingInProgress = useSelector(state => state.usersPage.followingInProgress.some(i => i === userId) );
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfileThunkCreator(userId));
        dispatch(getStatusThunkCreator(userId));
    }, [userId/* , authorisedUserId */]);
    useEffect(() => {
        if (!isOwner && profile) {
            console.log('myPageContainer useEffect ' + currentPage + profile.fullName);
            dispatch(getCurrentUserThunkCreator(null, currentPage, profile.fullName));
        }
    }, [userId, authorisedUserId, profileExists, followed]);
    let navigate = useNavigate();
    const startDialog = (userId, fullName) => {
        dispatch(startDialogAC(userId, fullName));
        navigate(`/dialogs`);
    }
    
    if (!profile) {
        return <Preloader />
    }
    isOwner = (profile.userId === authorisedUserId);

    return <MyPage /* {...props} */
        userId={userId}
        city={city}
        followers={followers}
        skills={skills}
        profile={profile}
        isOwner={isOwner}
        status={status}
        followingInProgress={followingInProgress}
        followed={followed}
        startDialog={startDialog}
    />
}


export default MyPageContainer;

