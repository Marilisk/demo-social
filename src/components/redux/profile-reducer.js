import { profileAPI } from './../../api/api.js';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const ADD_SKILL = 'ADD_SKILL';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const SWITCH_BUTTON_ABILITY = 'SWITCH_BUTTON_ABILITY';
const SET_IS_OWNER = 'SET_IS_OWNER';
const LIKE_POST = 'LIKE_POST';

let initialState = {
    posts: [
        { id: 1, date: '2022-08-01', text: "I'm soooo gooood", likeCount: 15 },
        { id: 2, date: '2022-08-03', text: 'Very important event is happening!', likeCount: 20 },
        { id: 3, date: '2022-08-08', text: 'So tired...', likeCount: 0 },
        { id: 4, date: '2022-08-30', text: 'Hello everybody!!', likeCount: 5 },
    ],
    city: 'Москва, Россия',
    followersAmount: 2,
    skills: [
        { id: 1, skill: 'JavaScript', isSelected: true },
        { id: 2, skill: 'CSS', isSelected: true },
        { id: 3, skill: 'Interface Design', isSelected: false },
        { id: 4, skill: 'React', isSelected: true },
        { id: 5, skill: 'высокая работоспособность', isSelected: true },
        { id: 6, skill: 'английский язык', isSelected: true },
        { id: 7, skill: 'Angular', isSelected: false },
        { id: 8, skill: 'Python', isSelected: false },
        { id: 9, skill: 'PHP', isSelected: false },
    ],
    profile: null,
    status: '',
    buttonDisabled: false,
    isOwner: true,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            //console.log(action.date);
            let newPost = {
                id: state.posts.length + 1,
                date: action.date,
                text: action.newPostText,
                likeCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            };
        };
        case DELETE_POST: {
            return { ...state, posts: state.posts.filter(p => p.id !== action.id) };
        };
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile, userId: action.profile.userId };
        case SET_STATUS:
            return { ...state, status: action.status };
        case ADD_SKILL:
            return {
                ...state,
                skills: state.skills.map(s => {
                    if (s.id === action.id) {
                        return { ...s, isSelected: true, };
                    }
                    return s;
                }),
            };
        case UPDATE_PROFILE: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    fullName: action.data.fullName,
                    aboutMe: action.data.aboutMe,
                    contacts: action.data.contacts,
                    lookingForAJob: action.data.lookingForAJob,
                    lookingForAJobDescription: action.data.lookingForAJobDescription,
                },
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return { ...state, profile: { ...state.profile, photos: action.photos } };
        }
        case SWITCH_BUTTON_ABILITY: {
            return { ...state, buttonDisabled: action.mode };
        }
        case SET_IS_OWNER: {
            return { ...state, isOwner: action.isOwner };
        }
        case LIKE_POST: {
            return { ...state, posts: state.posts.map(p => {
                if (p.id === action.postId) {
                    return {...p, likeCount: p.likeCount += 1 } 
                } 
                return p;
            } ) };
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText, date) => ({ type: ADD_POST, newPostText: newPostText, date: date });
export const setUserProfileActionCreator = profile => ({ type: SET_USER_PROFILE, profile });
export const setStatusActionCreator = status => ({ type: SET_STATUS, status });
export const addSkillToKitAC = id => ({ type: ADD_SKILL, id: id });
const updateProfileAC = data => ({ type: UPDATE_PROFILE, data });
export const deletePostAC = (id) => ({ type: DELETE_POST, id: id });
export const savePhotoSuccessAC = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });
export const switchButtonAbilityAC = (mode) => ({ type: SWITCH_BUTTON_ABILITY, mode });
export const setIsOwnerAC = (isOwner) => ({ type: SET_IS_OWNER, isOwner });
export const likePostAC = (postId) => ({ type: LIKE_POST, postId });

export const getUserProfileThunkCreator = (userId) => {
    return async function ProfileThunk(dispatch) {
        let response = await profileAPI.getProfile(userId);
        dispatch(setUserProfileActionCreator(response.data));
    }
};

export const getStatusThunkCreator = (userId) => {
    return async function getStatusThunk(dispatch) {
        const response = await profileAPI.getStatus(userId);
        dispatch(setStatusActionCreator(response.data));
    }
};

export const updateStatusThunkCreator = (status) => {
    return async function updateStatusThunk(dispatch) {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatusActionCreator(status));
        }
    }
};

export const updateProfileThunkCreator = (json, data) => {
    return function updateProfileThunk(dispatch) {
        dispatch(switchButtonAbilityAC(true));
        profileAPI.updateProfile(json)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(updateProfileAC(data));
                    dispatch(switchButtonAbilityAC(false));
                } else {
                    console.log('response.data.resultCode' + response.data.resultCode);
                    console.log(response.data);
                    dispatch(switchButtonAbilityAC(false));
                }
            })
    }
}


export const savePhotoThunkCreator = (file) => {
    return async function savePhotoThunk(dispatch) {
        let response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccessAC(response.data.data.photos));
        } else {
            console.log('response.data.resultCode' + response.data.resultCode);
            console.log(response.data);
        }
    };
}


export default profileReducer;
