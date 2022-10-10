import React from "react";
import Header from './Header.jsx';
import { setLoginThunkCreator, logoutFormThunkCreator } from './../redux/auth-reducer.js';
import { useDispatch, useSelector } from 'react-redux/es/exports.js';
import { getCurrentUserThunkCreator } from "../redux/users-reducer.js";
import { redirect, useNavigate } from "react-router-dom";

export const HeaderContainer = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const login = useSelector(state => state.auth.login);
    const id = useSelector(state => state.auth.id);
    const totalCount = useSelector(state => state.usersPage.totalCount);
    const nothingFound = useSelector(state => state.usersPage.nothingFound);

    const searchResults = useSelector(state => state.usersPage.users);

    const dispatch = useDispatch();
    const setLogin = () => {
        dispatch(setLoginThunkCreator())
    }
    const logout = () => {
        dispatch(logoutFormThunkCreator());
    }
    const navigate = useNavigate();
    const search = (term) => {
        dispatch(getCurrentUserThunkCreator(null, 1, term, true));
        if (!nothingFound) {
            navigate('/users', { state: 'searchResults'});
            
        } else {
            console.log('nothing')
        }
    }

    return <Header isAuth={isAuth} 
        login={login}  
        id={id} 
        setLogin={setLogin} 
        logout={logout}
        search={search}
        nothingFound={nothingFound} />
}

