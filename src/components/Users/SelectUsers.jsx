import React from "react";
import c from './users.module.css';

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

