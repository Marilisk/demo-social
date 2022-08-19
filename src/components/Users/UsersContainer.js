import React from "react";
import Users from "./Users";
import Preloader from "../common/preloader/preloader";
import { connect } from 'react-redux/es/exports.js';
import { setCurrentPageAC, 
    toggleFollowingInProgressAC, 
    getUsersThunkCreator, 
    unFollowThunkCreator, 
    followThunkCreator } from '../redux/users-reducer.js';
import { getPageSize, getTotalUsersCount, getUsersSuperSelector, getCurrentPage, getIsFetching, getFollowingInProgress } from "../redux/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }
    onPageChanged = (pageNumber) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null }
            <Users totalUsersCount = {this.props.totalUsersCount}
                        pageSize = {this.props.pageSize}
                        currentPage = {this.props.currentPage}
                        onPageChanged = {this.onPageChanged}
                        users={this.props.users}
                        follow={this.props.follow}
                        unFollow={this.props.unFollow}
                        followingInProgress={this.props.followingInProgress}  
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
};

export default connect(mapStateToProps, { 
    follow: followThunkCreator, 
    unFollow: unFollowThunkCreator, 
    setCurrentPage: setCurrentPageAC, 
    toggleFollowingInProgress: toggleFollowingInProgressAC,
    getUsersThunkCreator: getUsersThunkCreator, }) (UsersContainer);

