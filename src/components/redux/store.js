import profileReducer from "./profile-reducer";
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

let store = {
    _state: {
        dialogsPage: {
            dialogsData: [
                {id: 1, name: 'Маша', avaSrc: 'https://miro.medium.com/max/1200/1*6B8ggGnMHopsrLO775K6oQ.png',},
                {id: 2, name: 'Андрей', avaSrc: 'https://miro.medium.com/max/1200/1*6B8ggGnMHopsrLO775K6oQ.png',},
                {id: 3, name: 'Света', avaSrc: 'https://miro.medium.com/max/1200/1*6B8ggGnMHopsrLO775K6oQ.png',},
                {id: 4, name: 'Александр', avaSrc: 'https://miro.medium.com/max/1200/1*6B8ggGnMHopsrLO775K6oQ.png',}
            ],
            messageData: [
                {authorId: 1, text: 'Hi', },
                {authorId: 2, text: 'Thank you', },
                {authorId: 3, text: 'Yo!', },
            ],
            newMessageBody: 'sudtut',
        },
        profilePage: {
            posts: [
                {id: 1, date:'2022-02-01', text:"I'm soooo gooood", likeCount: 15},
                {id: 2, date:'2022-02-10', text:'Very important event is happening!', likeCount: 20},
                {id: 3, date:'2022-02-20', text:'So tired...', likeCount: 0},
                {id: 3, date:'2022-02-01', text:'Hello everybody!!', likeCount: 5},
            ],
            newPostText: 'sudtut',
        },
        sideBar: {
            friends: [],
        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber() { 
        console.log('smth changed');
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) { 
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sideBar = sidebarReducer(this._state.sideBar, action);

        this._callSubscriber(this._state);        
    },  
}






export default store;