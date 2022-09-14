import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import profileReducer from './profile-reducer.js';
import dialogsReducer from './dialogs-reducer.js';
import sidebarReducer from './sidebar-reducer.js'; 
import usersReducer from './users-reducer.js';
import newsReducer from './news-reducer.js';
import authReducer from './auth-reducer.js';
import thunkMiddleware from 'redux-thunk';
import appReducer from './app-reducer.js';

let reducers = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
        
    newsPage: newsReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

//window.store = store;

export default store;