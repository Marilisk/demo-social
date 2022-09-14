import React from "react";
import { connect, useDispatch, useSelector } from 'react-redux/es/exports.js';
import Profile from "./Profile";
import { setUserProfileActionCreator, getUserProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator } from "../redux/profile-reducer.js";
import { setLoginThunkCreator } from "../redux/auth-reducer.js";
import {useLocation, useNavigate, useParams } from "react-router-dom";
import {withAuthRedirect} from './../../HOC/withAuthRedirect.js';
import { useEffect } from "react";

const ProfileContainer = (props) => {

    const authorisedUserId = useSelector(state => state.auth.id);
    const profile = useSelector(state => state.profilePage.profile);
    const status = useSelector(state => state.profilePage.status);
    const isAuth = useSelector(state => state.auth.isAuth);
    
    let userId;    
    let params = useParams();
    /* console.log('params');
    console.log(params); */
    if (!params.userId /* !Object.keys(params).length */ ) {
        userId = authorisedUserId;
    } else {
        userId = params.userId;
    }

    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(getUserProfileThunkCreator(userId));
        dispatch(getStatusThunkCreator(userId));
        console.log('userId');
        console.log(userId); 
    }, [userId]);
    
    return <Profile 
            currentUserId={userId}
            authorisedUserId={authorisedUserId}
            profile={profile} 
            status={status} 
            isAuth={isAuth}
            /> 
}

let ProfileContainerAuthRedirectHOC = withAuthRedirect(ProfileContainer); // редирект если не авторизован

let mapStateToProps = (state) => ({
    //profile: state.profilePage.profile,
    //auth: state.auth.isAuth,
    //authorisedUserEmail: state.auth.email,
    //status: state.profilePage.status, 
});

/* export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        
        return (
            <Component {...props} router={{ location, navigate, params }} />
        );
    }
    return ComponentWithRouterProp;
} */

export default /* connect (mapStateToProps, {setUserProfileActionCreator, 
                                            getUserProfileThunkCreator,
                                            getStatusThunkCreator,
                                            updateStatusThunkCreator,
                                            setLoginThunkCreator }) */  (ProfileContainerAuthRedirectHOC);


