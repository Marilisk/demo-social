import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const  Profile = function(props) {    
    return <div className={classes.content}>
        <div className={classes.content}> </div>
    
        <ProfileInfo profile={props.profile} 
                    status={props.status} 
                    updateStatusThunkCreator={props.updateStatusThunkCreator}
                    auth={props.auth} />
        <MyPostsContainer /> 
        
    </div>
};


export default Profile;



