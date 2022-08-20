import React from "react";
import { connect } from 'react-redux/es/exports.js';
import Profile from "./Profile";
import { setUserProfileActionCreator, getUserProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator } from "../redux/profile-reducer.js";
import { setLoginThunkCreator } from "../redux/auth-reducer.js";
import {useLocation, useNavigate, useParams } from "react-router-dom";
import {withAuthRedirect} from './../../HOC/withAuthRedirect.js';

class ProfileContainer extends React.Component {
    componentDidMount() { 
        let userId = this.props.router.params.userId; 
        if (!userId ) {
            userId = this.props.authorisedUserId;
        } 
        this.props.getUserProfileThunkCreator(userId);
        this.props.getStatusThunkCreator(userId);
    }
    
    render() {    
        return (
            <Profile {...this.props} profile={this.props.profile} 
                                        status={this.props.status} 
                                        updateStatusThunkCreator={this.props.updateStatusThunkCreator}
                                        auth={this.props.auth}
                                         /> 
        )
    }
}

let ProfileContainerAuthRedirectHOC = withAuthRedirect(ProfileContainer); // редирект если не авторизован

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    auth: state.auth.isAuth,
    authorisedUserId: state.auth.id,
    authorisedUserEmail: state.auth.email,
    status: state.profilePage.status, 
});

export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component {...props} router={{ location, navigate, params }} />
        );
    }
    return ComponentWithRouterProp;
}

export default connect (mapStateToProps, {setUserProfileActionCreator, 
                                            getUserProfileThunkCreator,
                                            getStatusThunkCreator,
                                            updateStatusThunkCreator,
                                            setLoginThunkCreator }) (withRouter(ProfileContainerAuthRedirectHOC));


