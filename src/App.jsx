import React, { useEffect, Suspense } from 'react';
import c from './App.module.css';
import HeaderContainer from './components/Header/Header-container.jsx';
import Navbar from './components/Navbar/Navbar';
import NewsContainer from './components/News/NewsContainer.jsx';
import { Routes, Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer.js';
import FormikForm from './components/Authentifications/FormikForm.jsx';
import { useDispatch, useSelector } from 'react-redux/es/exports.js';
import { initialiseAppThunkCreator } from './components/redux/app-reducer.js';
import Preloader from './components/common/preloader/preloader.js';
import EditProfileContainer from './components/MyPage/EditProfile/EditProfileFormContainer.jsx';
import NotFound from './components/common/preloader/NotFound';
import DialogItem from './components/Dialogs/DialogItem/DialogItem';
import MyPageContainer from './components/MyPage/MyPageContainer';
import MyPostsContainer from './components/Profile/MyPosts/MyPostsContainer';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

function App({ initialised, isAuth }) {

  if (initialised === false) { // до получения данных авторизован ли юзер показываем ему прелоадер
    return <Preloader />
  }

  return <>
    <div className={c.header}><HeaderContainer /></div>
    <div className={c.appWrapper}>
      <Navbar initialised={initialised} isAuth={isAuth} />
      <div className={c.appWrapperContent}>
        <Routes>
          <Route path='/' element={<UsersContainer />} />
          {/* <Route path='/profile' element={<ProfileContainer />} /> */}
          <Route path='/posts' element={<MyPostsContainer />} />
          <Route path='/users' element={<UsersContainer />} />
          <Route path='/login' element={<FormikForm />} />
          <Route path='/dialogs' element={<Suspense fallback={<div>Загрузка...</div>} ><DialogsContainer isAuth={isAuth} /></Suspense>} />
          <Route path='/dialogs/:userId/*' element={<DialogItem isAuth={isAuth} />} />
          <Route path='/news' element={<NewsContainer />} />
          <Route path='/formikForm' element={<FormikForm />} />
          <Route path='/mypage/*' element={<MyPageContainer />} />
          <Route path='/mypage/:userId/*' element={<MyPageContainer />} />
          <Route path='/editprofile' element={<EditProfileContainer />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  </>
}

export const AppContainer = () => {
  const dispatch = useDispatch();
  const initialised = useSelector(state => state.app.initialised);
  const isAuth = useSelector(state => state.auth.isAuth);
  useEffect(() => {
    dispatch(initialiseAppThunkCreator());
  }, []);

  return <App initialised={initialised} isAuth={isAuth} />
}

export default AppContainer;


