import { usersAPI } from '../../api/api.js';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';  // статус получения данных
const TOGGLE_FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS';
const SWITCH_SHOW_FOLLOWED = 'SWITCH_SHOW_FOLLOWED';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const NOTHING_FOUND = 'NOTHING_FOUND';
const PAGINATOR_NEEDED = 'PAGINATOR_NEEDED';

let initialState = {
    users: [],
    pageSize: 12,
    totalCount: 2000,
    currentPage: 1,
    portion: 1,
    isFetching: false, // англ. получение, статус получения данных
    followingInProgress: [],
    showOnlyFollowed: false,
    currentUser: {
        followed: false,
    },
    nothingFound: false,
    paginatorNeeded: true,
    foundUsersDisplayMode: false,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                currentUser: { ...state.currentUser, followed: true },
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return { ...u, followed: true, };
                    }
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                currentUser: { ...state.currentUser, followed: false },
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return { ...u, followed: false, };
                    }
                    return u;
                })
            };
        case SET_USERS: {
            return { ...state, users: action.users, totalUsersCount: action.totalUsersCount };
        }
        case SET_CURRENT_USER: {
            return { ...state, currentUser: action.user[0] };
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage };
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalCount: action.count, }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        case SWITCH_SHOW_FOLLOWED: {
            return { ...state, showOnlyFollowed: !state.showOnlyFollowed }
        }
        case NOTHING_FOUND: {
            return { ...state, nothingFound: action.nothingFound }
        }
        case PAGINATOR_NEEDED: {
            return { ...state, paginatorNeeded: action.needed, foundUsersDisplayMode: !action.needed }
        }
        default:
            return state;
    }
};

export const followSuccessAC = (id) => ({ type: FOLLOW, id });
export const unfollowSuccessAC = (id) => ({ type: UNFOLLOW, id });
export const setUsersAC = (users) => ({ type: SET_USERS, users });
export const setCurrentUserAC = (user) => ({ type: SET_CURRENT_USER, user });
export const setCurrentPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCountAC = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingInProgressAC = (isFetching, userId) => ({ type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId });
export const switchOnlyFollowedAC = () => ({ type: SWITCH_SHOW_FOLLOWED });
const setNothingFoundAC = (nothingFound) => ({ type: NOTHING_FOUND, nothingFound });
export const paginatorNeededAC = (needed) => ({ type: PAGINATOR_NEEDED, needed });

export const getfollowedUsersThunkCreator = (currentPage, pageSize, friend) => {
    return async (dispatch) => {
        dispatch(toggleIsFetchingAC(true));
        let data = await usersAPI.getFollowedUsers(currentPage, pageSize, friend);
        dispatch(toggleIsFetchingAC(true));
        dispatch(setCurrentPageAC(currentPage));
        dispatch(setUsersAC(data.items));
        dispatch(setTotalUsersCountAC(data.totalCount));
        dispatch(toggleIsFetchingAC(false));
    }
};
export const getUsersThunkCreator = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetchingAC(true));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetchingAC(true));
        dispatch(setCurrentPageAC(currentPage));
        dispatch(setUsersAC(data.items));
        dispatch(setTotalUsersCountAC(data.totalCount));
        dispatch(toggleIsFetchingAC(false));
    }
};
export const getCurrentUserThunkCreator = (currentPage, pageSize, term, every = false) => {
    return async (dispatch) => {
        dispatch(toggleIsFetchingAC(true));
        let data = await usersAPI.findUsers(currentPage, pageSize, term);
        if (every === true) {
            if (data.items.length) {
                dispatch(setUsersAC(data.items));
                dispatch(paginatorNeededAC(false));

                console.log(' search User ' + term);
                console.log(data.items);
                console.log('currentPage ' + currentPage);
                console.log('pageSize ' + pageSize);
            } else {
                dispatch(setNothingFoundAC(true));
                console.log(' search User ' + term);
                console.log(data.items);
                console.log('currentPage ' + currentPage);
                console.log('pageSize ' + pageSize);
            }
        } else if (every === false) {
            dispatch(setCurrentUserAC(data.items));
            /* console.log('qetCurrentUser');
            console.log(data.items);
            console.log(term); */
        }
        dispatch(toggleIsFetchingAC(false));
        dispatch(setCurrentPageAC(currentPage));
    }
};


export const followThunkCreator = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingInProgressAC(true, userId));
        let response = await usersAPI.followApiFunc(userId);
        if (response.data.resultCode === 0) {
            dispatch(followSuccessAC(userId));
        }
        dispatch(toggleFollowingInProgressAC(false, userId));
    }
};
export const unFollowThunkCreator = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingInProgressAC(true, userId));
        let response = await usersAPI.unFollowApiFunc(userId);
        if (response.data.resultCode === 0) {
            dispatch(unfollowSuccessAC(userId));
        }
        dispatch(toggleFollowingInProgressAC(false, userId));
    }
};



export default usersReducer;