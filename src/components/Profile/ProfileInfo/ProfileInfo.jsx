import React from "react";
import Preloader from "../../common/preloader/preloader";
import classes from './ProfileInfo.module.css';
import defaultAvatar from './../../../images/default_Avatar_new.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks.jsx';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    
    return <>
        <div className={classes.content}>
        
            <div className={classes.avaWrapper}>
                <img alt="" className={classes.userAva} src={(props.profile.photos.small == null) 
                    ? defaultAvatar 
                    : props.profile.photos.small } 
                />
            </div>
            
            <div className={classes.wrapper}>
                <div className={classes.name}>{props.profile.fullName}</div>
                <div className={classes.status}>{props.profile.aboutMe}
                    {props.profile.lookingForAJob ? 'в поиске работы ' : 'сейчас не ищет работу ' }
                    {props.profile.lookingForAJobDescription}
                    <ProfileStatusWithHooks status={props.status} 
                                            updateStatusThunkCreator={props.updateStatusThunkCreator} />

                </div>  
            </div>
        </div>
                    
    </>        
}

export default ProfileInfo;
