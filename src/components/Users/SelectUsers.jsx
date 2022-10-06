import React from "react";
import c from './users.module.css';
import defaultAva from './../../images/default_Avatar_new.png';
import { NavLink } from 'react-router-dom';
import { followThunkCreator, unFollowThunkCreator } from "../redux/users-reducer";
import { useDispatch } from "react-redux";
import Paginator from "./Paginator/Paginator.jsx";

export const SelectUsers = ({usersDisplayMode, switchUsersMode }) => {
    return <div className={c.selectWrapper}>

        <div className={(usersDisplayMode === 'all') ? c.selectAbled : c.selectDisabled} 
            onClick={() => switchUsersMode('all')}>
            <span className={c.selectHeader}>Все пользователи</span>
        </div>

        <div className={(usersDisplayMode === 'followers') ? c.selectAbled : c.selectDisabled} 
            onClick={() => switchUsersMode('followers')}>
            <span className={c.selectHeader}>Моя сеть</span>
        </div>

        <div className={(usersDisplayMode === 'strangers') ? c.selectAbled : c.selectDisabled} 
            onClick={() => switchUsersMode('strangers')}>
            <span className={c.selectHeader}>Незнакомые</span>
        </div>
        
    </div>
}

