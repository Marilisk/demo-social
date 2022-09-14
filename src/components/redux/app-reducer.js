import { setLoginThunkCreator } from './auth-reducer.js';
const INITIALISED_SUCCESSFULLY = 'INITIALISED_SUCCESSFULLY';
const INITIALISE_FAILED = 'INITIALISE_FAILED';
//const CHANGE_APP_MODE = 'CHANGE_APP_MODE';

let initialState = {
    initialised: false,
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALISED_SUCCESSFULLY:
            return {
                ...state, 
                initialised: true,                              
            }
        case INITIALISE_FAILED:
            return {
                ...state,
                initialised: false,
            }
        
        default:
            return state;
    }   
};

export const InitialisedSuccessfullyAC = () => ({type: INITIALISED_SUCCESSFULLY});

export const initialiseAppThunkCreator = () => {
    return function initialise (dispatch) {
        let promise = dispatch(setLoginThunkCreator());
        Promise.all([promise])
            .then( 
                () => dispatch(InitialisedSuccessfullyAC()) ,
                );
    }
}


export default appReducer;