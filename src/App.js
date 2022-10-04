import React, { useEffect, Suspense } from 'react';
import c from './App.module.css';
import HeaderContainer from './components/Header/Header-container.jsx';
import Navbar from './components/Navbar/Navbar';
import NewsContainer from './components/News/NewsContainer.jsx';
import {Routes, Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer.js';
import ProfileContainer from './components/Profile/ProfileContainer.jsx';
import FormikForm from './components/Authentifications/FormikForm.jsx';
import { connect, useSelector } from 'react-redux/es/exports.js';
import {initialiseAppThunkCreator} from './components/redux/app-reducer.js';
import Preloader from './components/common/preloader/preloader.js';
import { withRouter } from './components/Profile/ProfileContainer.jsx'; 
import { compose } from 'redux';
import EditProfileContainer from './components/MyPage/EditProfile/EditProfileFormContainer.jsx';
import NotFound from './components/common/preloader/NotFound';
import MyPage from './components/MyPage/MyPage.jsx';
import DialogItem from './components/Dialogs/DialogItem/DialogItem';

const DialogsContainer = React.lazy( () => import ('./components/Dialogs/DialogsContainer')) ;

function App(props) {
  const initialised = useSelector(state => state.app.initialised);
  const isAuth = useSelector(state => state.auth.isAuth);
  useEffect( () => {  
    props.initialiseAppThunkCreator();
  }, []);
  if (props.initialised === false) { // до получения данных авторизован ли юзер показываем ему прелоадер
    return <Preloader />
  } 

  return <>
    <div className={c.header}><HeaderContainer /></div>
    <div className={c.appWrapper}>
      <Navbar initialised={props.initialised}  />
      <div className={c.appWrapperContent}>
        <Routes>
          <Route path='/' element={<NewsContainer />} />
          <Route path='/profile' element={<ProfileContainer />} />
          <Route path='/users' element={<UsersContainer />} />
          <Route path='/login' element={<FormikForm />} />
          <Route path='/dialogs' element={<Suspense fallback={<div>Загрузка...</div>} ><DialogsContainer isAuth={isAuth} /></Suspense>} />
          <Route path='/dialogs/:userId/*' element={<DialogItem isAuth={isAuth} />} />
          <Route path='/news' element={<NewsContainer />} />
          <Route path='/formikForm' element={<FormikForm />} />
          <Route path='/mypage/*' element={<MyPage />} />
          <Route path='/mypage/:userId/*' element={<MyPage />} />
          <Route path='/editprofile' element={<EditProfileContainer />} />
          <Route path='*' element={<NotFound />} />
        </Routes> 
      </div>
    </div>
  </>
}

const mapStateToProps = (state) => ({
  initialised: state.app.initialised,
  showApp: state.app.showApp,    
})

export default connect (mapStateToProps, {initialiseAppThunkCreator: initialiseAppThunkCreator}) (App);

/* export default compose (
  withRouter,
  connect (mapStateToProps, {initialiseAppThunkCreator: initialiseAppThunkCreator})
) (App); */
