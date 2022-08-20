import { profileAPI} from './../../api/api.js';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const ADD_SKILL = 'ADD_SKILL';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts: [
        {id: 1, date:'2022-02-01', text:"I'm soooo gooood", likeCount: 15},
        {id: 2, date:'2022-02-10', text:'Very important event is happening!', likeCount: 20},
        {id: 3, date:'2022-02-20', text:'So tired...', likeCount: 0},
        {id: 4, date:'2022-02-01', text:'Hello everybody!!', likeCount: 5},
    ],
    city: 'Москва, Россия',
    followersAmount: 2,
    skills: [
        {id: 1, skill: 'JavaScript', isSelected: true},
        {id: 2, skill: 'CSS', isSelected: true},
        {id: 3, skill: 'Interface Design', isSelected: false},
        {id: 4, skill: 'React', isSelected: true},
        {id: 5, skill: 'высокая работоспособность', isSelected: true},
        {id: 6, skill: 'английский язык', isSelected: true},
        {id: 7, skill: 'Angular', isSelected: false},
        {id: 8, skill: 'Python', isSelected: false},
        {id: 9, skill: 'PHP', isSelected: false},
    ],
    profile: null,
    status: '',
};

const profileReducer = (state = initialState, action) => {  
    switch(action.type) {
        case ADD_POST: {
            let dateText = `${new Date(Date.now()).getDate()} числа ${new Date(Date.now()).getMonth()} месяца`;
            let newPost = {
                id: state.posts.length + 1,
                date: dateText,
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
                return {...state, posts: state.posts.filter( p => p.id !== action.id )};
            }
        case SET_USER_PROFILE:
            return {...state, profile: action.profile, userId: action.profile.userId };
        case SET_STATUS:
            return {...state, status: action.status};
        case ADD_SKILL: 
            return {
                ...state, 
                skills: state.skills.map (s => {
                    if (s.id === action.id) {
                        return {...s, isSelected: true,};
                    }
                    return s;                    
                }), 
            };
        case UPDATE_PROFILE: {
            console.log('i m in UPDATE_PROFILE ');
            return {
                ...state,
                profile: action.data,
            }
        }
        default: 
            return state;
    } 
} 

export const addPostActionCreator = (newPostText) => ( { type: ADD_POST, newPostText: newPostText } );
export const setUserProfileActionCreator = profile => ( {type: SET_USER_PROFILE, profile} );
export const setStatusActionCreator = status => ( {type: SET_STATUS, status} );
export const addSkillToKitAC = id => ( {type: ADD_SKILL, id: id} );
const updateProfileAC = data => ({type: UPDATE_PROFILE, data});
export const deletePostAC = (id) => ({type: DELETE_POST, id: id});

export const getUserProfileThunkCreator = (userId) => {
    return function ProfileThunk(dispatch) {
        profileAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfileActionCreator(response.data));
            });
    }       
};

export const getStatusThunkCreator = (userId) => {
    return function getStatusThunk(dispatch) {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatusActionCreator(response.data));
            });
    }       
}

export const updateStatusThunkCreator = (status) => {
    return function updateStatusThunk(dispatch) {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatusActionCreator(status));
                }                
            });
    }
}

export const updateProfileThunkCreator = (data) => {
    return function updateProfileThunk(dispatch) {
        console.log(data);
        profileAPI.updateProfile(data)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(updateProfileAC(data));
                } else {
                    console.log('response.data.resultCode' + response.data.resultCode);
                    console.log(response.data);
                }
            } )
    }
}

export default profileReducer;
