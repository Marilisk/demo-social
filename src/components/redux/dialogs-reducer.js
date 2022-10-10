const SEND_MESSAGE = 'SEND_MESSAGE';
const START_DIALOG = 'START_DIALOG';

let initialState = {
    dialogsData: [
        {
            userId: 1, name: 'Саша', avaSrc: null, messages: [
                { id: 1, authorId: 0, body: 'спасибо, мне не интересно' },
                { id: 2, authorId: 1, body: 'Здравствуйте, предлагаем участие в бесплатном вебинаре по инвестироанию в криптовалюты.', }
            ],
        },
        { userId: 2, name: 'Андрей', avaSrc: null, messages: [{ id: 1, authorId: 2, body: 'привет' },], },
        { userId: 3, name: 'Виктория Максимова', avaSrc: null, messages: [{ id: 1, authorId: 3, body: 'жду документы' },], },

    ],
    messages: [
        { authorId: 1, text: 'Hi', },
        { authorId: 2, text: 'Thank you', },
        { authorId: 3, text: 'Yo!', },
    ],
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                dialogsData: [...state.dialogsData.map(el => {
                    if (el.userId === action.userId) {
                        el.messages.unshift({ id: el.messages.length + 1, authorId: 0, body: action.newMessageBody });
                    }
                    return el;
                })]
            }
        case START_DIALOG:
            let stateCopy = { ...state };
            stateCopy.dialogsData = [...state.dialogsData];
            let newDialog = { userId: action.userId, name: action.fullName, avaSrc: null, messages: [], };
            stateCopy.dialogsData.unshift(newDialog);
            return stateCopy;
        default:
            return state;
    }
}

export const sendMessageAC = (userId, newMessageBody) => ({ type: SEND_MESSAGE, userId: userId, newMessageBody: newMessageBody });
export const startDialogAC = (userId, fullName) => ({ type: START_DIALOG, userId, fullName });




export default dialogsReducer;