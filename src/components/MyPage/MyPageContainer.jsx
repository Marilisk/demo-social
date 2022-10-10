import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStatusThunkCreator, getUserProfileThunkCreator, savePhotoThunkCreator, setIsOwnerAC } from '../redux/profile-reducer.js';
import { useEffect } from "react";
import Preloader from "../common/preloader/preloader";
import { getCurrentUserThunkCreator } from "../redux/users-reducer";
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

    return <MyPage 
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

