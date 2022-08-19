import {usersAPI} from '../../api/api.js';

const FOLLOW ='FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';  // статус получения данных
const TOGGLE_FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalCount: 30,
    currentPage: 1,
    isFetching: true, // англ. получение, статус получения данных
    followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: 
            return {
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.id) {
                        return {...u, followed: true, };
                    }
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map ( u => {
                    if (u.id === action.id) {
                        return {...u, followed: false, }; 
                    }
                    return u;
                })
            };
        case SET_USERS: {
            return {...state, users: action.users, totalUsersCount: action.totalUsersCount };
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage };
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalCount: action.count, }
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_FOLLOWING_IN_PROGRESS: {
            return {
                ...state, 
                followingInProgress: action.isFetching ?
                [...state.followingInProgress, action.userId] 
                : state.followingInProgress.filter(id => id !== action.userId)    
            }
        }
        default:
            return state;
    }
};

export const followSuccess = (id) => ({type: FOLLOW, id}) ;
export const unfollowSuccess = (id) => ({type: UNFOLLOW, id}) ;
export const setUsersAC = (users) => ({type: SET_USERS, users });
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCountAC = (totalUsersCount) => ( {type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
export const toggleIsFetchingAC = (isFetching) => ( {type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingInProgressAC = (isFetching, userId) => ( {type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId });

export const getUsersThunkCreator = (currentPage, pageSize ) => {   
     return async (dispatch) => { // функция thunk, с помощью которой убрали из презент компонента логику по запросу на сервер и диспатч экшнов
        dispatch(toggleIsFetchingAC(true));
        let data =  await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetchingAC(true));
        dispatch(setCurrentPageAC(currentPage));
        dispatch(setUsersAC(data.items));
        dispatch(setTotalUsersCountAC(data.totalCount));
        dispatch(toggleIsFetchingAC(false));
    }
};

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {  // функция для устранения дублируещегося кода в фоолоу и анфоллоу СанкКреаторах
    dispatch(toggleFollowingInProgressAC(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    };  
    dispatch(toggleFollowingInProgressAC(false, userId));   
};
export const followThunkCreator = (userId) => {
    return async (dispatch) => {
        let apiMethod = usersAPI.followApiFunc.bind(usersAPI);
        let actionCreator = followSuccess;  
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
};
export const unFollowThunkCreator = (userId) => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unFollowApiFunc.bind(usersAPI);
        let actionCreator = unfollowSuccess;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
};

export default usersReducer;