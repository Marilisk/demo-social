import { addPostActionCreator } from '../../redux/profile-reducer.js';
import MyPosts from './MyPosts';
import { connect } from 'react-redux/es/exports.js';

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);  


export default MyPostsContainer;
