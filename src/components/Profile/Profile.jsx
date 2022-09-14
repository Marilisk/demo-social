import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const  Profile = function({currentUserId, authorisedUserId, profile, status, isAuth}) {  
    
    return <div className={classes.content}>
        <div className={classes.content}> </div>
    
        <ProfileInfo currentUserId={currentUserId}
                    authorisedUserId={authorisedUserId}
                    profile={profile} 
                    status={status} 
                    isAuth={isAuth}
        />
        <MyPostsContainer /> 
        
    </div>
};

export default Profile;



