import React from "react";
import Preloader from "../../common/preloader/preloader";
import classes from './ProfileInfo.module.css';
import defaultAvatar from './../../../images/default_Avatar_new.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks.jsx';
import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate, useParams } from "react-router-dom";
import { savePhotoThunkCreator } from "../../redux/profile-reducer";

const ProfileInfo = ({currentUserId, authorisedUserId, profile, status, isAuth}) => {
    const dispatch = useDispatch();
    const savePhoto = (file) => {
        dispatch(savePhotoThunkCreator(file));
    } 
    if (profile) {
        
    } 
    const isOwner = currentUserId === authorisedUserId;
    console.log('currentUserId');
    console.log(currentUserId);
    console.log('isOwner');
    console.log(isOwner);

    if (!profile) {   // мигание возникает если это включить
        return <Preloader />
    }   
    //debugger;
    return <>
        <div className={classes.content}>
        
            <div className={classes.avaWrapper}>
                <img alt="" className={classes.userAva} src={(profile.photos.small === null) 
                    ? defaultAvatar 
                    : profile.photos.small } 
                />
            </div>

            {isOwner && 
            <div className={classes.uploadAva}>
                <input type={'file'} onChange={ (e) => savePhoto(e.target.files[0])} />
            </div>
            } 
            
            
            <div className={classes.wrapper}>
                <div className={classes.name}>{profile.fullName}</div>
                <div className={classes.status}>{profile.aboutMe}
                    {profile.lookingForAJob ? 'в поиске работы ' : 'сейчас не ищет работу ' }
                    {profile.lookingForAJobDescription}
                    <ProfileStatusWithHooks status={status} />
                </div>  
            </div>
        </div>
                    
    </>        
}

export default ProfileInfo;
