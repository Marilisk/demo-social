const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    dialogsData: [
        {id: 1, name: 'Саша', avaSrc: 'https://miro.medium.com/max/1200/1*6B8ggGnMHopsrLO775K6oQ.png',},
        {id: 2, name: 'Андрей', avaSrc: 'https://miro.medium.com/max/1200/1*6B8ggGnMHopsrLO775K6oQ.png',},
        {id: 3, name: 'Света', avaSrc: 'https://miro.medium.com/max/1200/1*6B8ggGnMHopsrLO775K6oQ.png',},
        {id: 4, name: 'Александр', avaSrc: 'https://miro.medium.com/max/1200/1*6B8ggGnMHopsrLO775K6oQ.png',}
    ],
    messages: [
        {authorId: 1, text: 'Hi', },
        {authorId: 2, text: 'Thank you', },
        {authorId: 3, text: 'Yo!', },
    ],
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            
            let body = action.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {authorId: 5, text: body, },]
            }
        default:
            return state;
    }
} 

export const sendMessageActionCreator = (newMessageBody) => ( {type: SEND_MESSAGE, newMessageBody: newMessageBody} );

export default dialogsReducer;