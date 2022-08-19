
import {authAPI} from './../../api/api.js';
const SET_USER_DATA = 'SET_USER_DATA';
const ERROR_RESULT_CODE = 'ERROR_RESULT_CODE';
const STOP_SUBMIT = 'STOP_SUBMIT';

let initialState = {
    id: '',
    email: '',
    login: null,
    isAuth: false,
    isFetching: false,
    errorMessages: null,
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state, 
                id: action.id,
                email: action.email,
                login: action.login,
                isAuth: action.isAuth,                              
            }
        case ERROR_RESULT_CODE:
            return {
                ...state, 
                errorMessages: action.errorMessages,
            }
        case STOP_SUBMIT:
            return {
                ...state,
                errorMessages: action.errorMessages,
            }
        default:
            return state;
    }   
};

export const setAuthUserDataAC = (id, email, login, isAuth) => ({type: SET_USER_DATA, id, email, login, isAuth });

export const setLoginThunkCreator = () => {
    return async (dispatch) => {
        let response = await authAPI.me();
        
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data; // два раза дата потому первая дата это аксиос упаковывает данные в объекта дата, вторая дата наша
            dispatch(setAuthUserDataAC (id, email, login, true));
        } else {
            console.log('response.data.resultCode = ' + response.data.resultCode);
            // throw SyntaxError;
        };
    }
}

export const loginFormThunkCreator = (FormData) => {
    return async function loginFormThunk(dispatch) {
        let response = await authAPI.login(FormData);
            if (response.data.resultCode === 0) {
                dispatch(setLoginThunkCreator());  
            } else {
                let action = {type: STOP_SUBMIT, email: "Wrong email", errorMessages: 'во введенных данных ошибка...' };
                dispatch(action);
                console.log('Я в loginFormThunkCreator. response.data.resultCode= ' + response.data.resultCode);
            }
    };
};

export const logoutFormThunkCreator = () => {
    return async function logoutFormThunk(dispatch) {
        let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserDataAC (null, null, null, false));                    
        };        
    }
}

export default authReducer;