import React, { useEffect, useState } from "react";
import Users from "./Users";
import Preloader from "../common/preloader/preloader";
import { useDispatch, useSelector } from 'react-redux/es/exports.js';
import { getUsersThunkCreator, getfollowedUsersThunkCreator, setCurrentPageAC } from '../redux/users-reducer.js';

const UsersContainer = () => {
    const dispatch = useDispatch();

    const [usersDisplayMode, switchDifferentUsersMode] = useState('all');
    const switchUsersMode = (value) => {
        dispatch(setCurrentPageAC(1));
        switchDifferentUsersMode(value);    
    } 
    
    const pageSize = useSelector(state => state.usersPage.pageSize);
    const currentPage = useSelector(state => state.usersPage.currentPage);
    const isFetching = useSelector(state => state.usersPage.isFetching);
    const totalUsersCount = useSelector(state => state.usersPage.totalCount);
    const onPageChanged = (pageNumber) => {
        dispatch(setCurrentPageAC(pageNumber));
    };
    useEffect(() => {
        if (usersDisplayMode === 'all') {
            dispatch(getUsersThunkCreator(currentPage, pageSize));
        } else if (usersDisplayMode === 'followers') {
            dispatch(getfollowedUsersThunkCreator(currentPage, pageSize, true));
        } else if (usersDisplayMode === 'strangers') {
            dispatch(getfollowedUsersThunkCreator(currentPage, pageSize, false ));
        }
    }, [currentPage, pageSize, usersDisplayMode]);
    
    const users = useSelector(state => state.usersPage.users);
    const followingInProgress = useSelector(state => state.usersPage.followingInProgress);

    console.log('currentPage ' + currentPage);

    return <>
        {isFetching ? <Preloader /> : null}
        <Users totalUsersCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            users={users}
            followingInProgress={followingInProgress}
            usersDisplayMode={usersDisplayMode}
            switchUsersMode={switchUsersMode}
        />
    </>
}

export default UsersContainer;



