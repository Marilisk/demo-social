import React, { useEffect, useState } from "react";
import Users from "./Users";
import Preloader from "../common/preloader/preloader";
import { useDispatch, useSelector } from 'react-redux/es/exports.js';
import { getUsersThunkCreator, getfollowedUsersThunkCreator, setCurrentPageAC, paginatorNeededAC } from '../redux/users-reducer.js';

const UsersContainer = (props) => {
    //console.log(props);
    const foundUsersDisplayMode = useSelector(state => state.usersPage.foundUsersDisplayMode);
    //console.log('foundUsersDisplayMode ' + foundUsersDisplayMode);

    const dispatch = useDispatch();

    const [usersDisplayMode, switchDifferentUsersMode] = useState('all');
    const switchUsersMode = (value) => {
        dispatch(setCurrentPageAC(1));
        switchDifferentUsersMode(value); 
        dispatch(paginatorNeededAC(true));   
    } 
    
    const pageSize = useSelector(state => state.usersPage.pageSize);
    const currentPage = useSelector(state => state.usersPage.currentPage);
    const isFetching = useSelector(state => state.usersPage.isFetching);
    const totalUsersCount = useSelector(state => state.usersPage.totalCount);
    const paginatorNeeded = useSelector(state => state.usersPage.paginatorNeeded);
    const onPageChanged = (pageNumber) => {
        dispatch(setCurrentPageAC(pageNumber));
    };
    useEffect(() => {
        if (usersDisplayMode === 'all' && !foundUsersDisplayMode) {
            console.log('users useEffect all');
            dispatch(getUsersThunkCreator(currentPage, pageSize));
        } else if (usersDisplayMode === 'followers') {
            console.log('users useEffect followers');
            dispatch(getfollowedUsersThunkCreator(currentPage, pageSize, true));
        } else if (usersDisplayMode === 'strangers') {
            console.log('users useEffect strangers');
            dispatch(getfollowedUsersThunkCreator(currentPage, pageSize, false ));
        }
    }, [currentPage, pageSize, usersDisplayMode]);
    
    const users = useSelector(state => state.usersPage.users);
    const followingInProgress = useSelector(state => state.usersPage.followingInProgress);

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
            paginatorNeeded={paginatorNeeded}
        />
    </>
}

export default UsersContainer;



