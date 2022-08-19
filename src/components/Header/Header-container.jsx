import React from "react";
import Header from './Header.jsx';
import { setLoginThunkCreator, logoutFormThunkCreator } from './../redux/auth-reducer.js';
import { connect } from 'react-redux/es/exports.js';

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.setLoginThunkCreator();
    }
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id,
});

export default connect(mapStateToProps,
                    { setLoginThunkCreator: setLoginThunkCreator,
                    logoutFormThunkCreator: logoutFormThunkCreator }) (HeaderContainer);