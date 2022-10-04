import React from "react"; 
import { Navigate } from "react-router-dom";
import {connect, useSelector} from 'react-redux';

/* export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (this.props.isAuth === false) return <Navigate to='/login' />
            return <Component {...this.props} />
        }
    }
    let mapStateToPropsForRedirect = (state) => ({isAuth: state.auth.isAuth}) ;
    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent); 
    return ConnectedRedirectComponent;
} */


export const withAuthRedirect = (Component, isAuth) => {
    //const isAuth = useSelector(state => state.auth.isAuth);
    if (!isAuth) {
        return <Navigate to='/login' />
    }
    return <Component isAuth={isAuth} />
}