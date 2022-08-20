import React, {useEffect} from "react";
import MyPage from "./MyPage";
import { connect } from "react-redux";
import { setLoginThunkCreator } from '../redux/auth-reducer.js';
import { addSkillToKitAC, getUserProfileThunkCreator } from '../redux/profile-reducer.js';
import { switchShowAppModeAC } from '../redux/app-reducer.js';

const MyPageContainer = (props) =>  {
    useEffect( () => {
        let userId = props.id;
        props.getUserProfileThunkCreator(userId);
        //console.log('MyPageContainer useEffect. ');
    }, [props.isAuth]);

        
    return <MyPage {...props} />
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id,
    city: state.profilePage.city,
    followers: state.profilePage.followersAmount,
    skills: state.profilePage.skills,
    profile: state.profilePage.profile,
});
const mapDispatchToProps = (dispatch) => {
    return {
        setLoginThunkCreator: () => {
            dispatch(setLoginThunkCreator());
        },
        addSkillToKit: (id) => {
            dispatch(addSkillToKitAC(id));
        },
        getUserProfileThunkCreator: (userId) => {
            dispatch(getUserProfileThunkCreator(userId));
        },
        switchShowAppMode: () => {
            dispatch(switchShowAppModeAC());
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (MyPageContainer);