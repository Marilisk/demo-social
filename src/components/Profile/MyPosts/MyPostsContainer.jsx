import { addPostActionCreator, deletePostAC, likePostAC } from '../../redux/profile-reducer.js';
import MyPosts from './MyPosts';
import { useDispatch, useSelector } from 'react-redux/es/exports.js';


const MyPostsContainer = () => {
    const dispatch = useDispatch();
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();
    let formattedDate = `${year}-${month + 1}-${day}`
    const addPost = (newPostText) => {
        dispatch(addPostActionCreator(newPostText, formattedDate));
    }
    const posts = useSelector( state => state.profilePage.posts);
    const pressLike = (postId) => {
        dispatch(likePostAC(postId));
    }
    const deletePost = (postId) => {
        dispatch(deletePostAC(postId));
    }

    return <MyPosts addPost={addPost} posts={posts} pressLike={pressLike} deletePost={deletePost} />
} ;  


export default MyPostsContainer;
