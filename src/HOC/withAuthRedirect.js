import React from "react"; 
import { Navigate, Redirect } from "react-router-dom";
import {connect} from 'react-redux';

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (this.props.isAuth === false) return <Navigate to='/login' />
            return <Component {...this.props} />
        }
        
    }

    let mapStateToPropsForRedirect = (state) => ({isAuth: state.auth.isAuth}) ;
    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent); 
    return ConnectedRedirectComponent;
}