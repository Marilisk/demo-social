import React, { useState } from "react";
import classes from './MyPage.module.css';
import defaultAvatar from './../../images/default_Avatar.jpg';
import dots from './../../images/myPage/menu-dots.svg';
import { NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStatusThunkCreator, getUserProfileThunkCreator, savePhotoThunkCreator, setIsOwnerAC } from '../redux/profile-reducer.js';
import { useEffect } from "react";
import Preloader from "../common/preloader/preloader";
import briefcase from './../../images/myPage/briefcase.svg';
import geo from './../../images/myPage/marker.svg';
import note from './../../images/myPage/note.svg';
import ProfileStatusWithHooks from "../Profile/ProfileInfo/ProfileStatusWithHooks";
import EditProfileContainer from "./EditProfile/EditProfileFormContainer";
import { followThunkCreator, getCurrentUserThunkCreator, unFollowThunkCreator } from "../redux/users-reducer";
import Skills from "./Skills/Skills";


const MyPageContainer = (props) => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const login = useSelector(state => state.auth.login);
    const authorisedUserId = useSelector(state => state.auth.id);
    const city = useSelector(state => state.profilePage.city);
    const followers = useSelector(state => state.profilePage.followersAmount);
    const skills = useSelector(state => state.profilePage.skills);
    const profile = useSelector(state => state.profilePage.profile);
    const status = useSelector(state => state.profilePage.status);
    const followed = useSelector(state => state.usersPage.currentUser.followed);
    const currentPage = useSelector(state => state.usersPage.currentPage);

    const profileExists = (profile === undefined);

    let userId;
    let isOwner;
    const params = useParams();
    if (!params.userId) {
        userId = authorisedUserId;
    } else {
        userId = params.userId;
    }
    
    const followingInProgress = useSelector(state => state.usersPage.followingInProgress.some(i => i === userId) );
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfileThunkCreator(userId));
        dispatch(getStatusThunkCreator(userId));
    }, [userId/* , authorisedUserId */]);
    useEffect(() => {
        if (!isOwner && profile) {
            dispatch(getCurrentUserThunkCreator(null, currentPage, profile.fullName));
        }
    }, [userId, authorisedUserId, profileExists, followed]);
    
    if (!profile) {
        return <Preloader />
    }
    isOwner = (profile.userId === authorisedUserId);
    dispatch(setIsOwnerAC(isOwner));

    return <MyPage {...props}
        userId={userId}
        city={city}
        followers={followers}
        skills={skills}
        profile={profile}
        isOwner={isOwner}
        status={status}
        followingInProgress={followingInProgress}
        followed={followed}
    />
}

const MyPage = ({ userId, city, followers, skills, profile, isOwner, status, followingInProgress, followed }) => {
    //console.log('isOwner ' + isOwner);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const savePhoto = (file) => {
        dispatch(savePhotoThunkCreator(file));
    }
    const unFollow = () => {
        dispatch(unFollowThunkCreator(userId));
    }
    const follow = () => {
        dispatch(followThunkCreator(userId));
    }
    
    const [hiddenMode, changeModalMode] = useState(false);

    return <div className={classes.main}>

        <section className={classes.headFlexWrapper}>

            <div className={classes.avaWrapper}>
                <img alt=""
                    className={classes.userAva}
                    src={(profile && profile.photos && profile.photos.small) ? profile.photos.small : defaultAvatar}
                />
                
            </div>
            

            <div className={classes.profile}>
                <h2>{profile.fullName}</h2>
                <ProfileStatusWithHooks status={status} isOwner={isOwner} />
                
                <span className={classes.description}>
                    <img src={geo} className={classes.icon} alt='' />
                    {city}
                </span>
                <span className={classes.description}>
                    <img src={briefcase} className={classes.icon} alt='' />
                    {profile.lookingForAJob ? 'в поиске работы' : 'сейчас не ищу работу'}
                </span>

                <span className={classes.description}>
                    подписчики: {followers}
                </span>
                <span className={classes.description}>
                    {(profile && profile.aboutMe) && `Обо мне: ${profile.aboutMe}`}
                </span>
            </div>

            {isOwner ?
                    <div className={classes.editBlock}>
                        <button type='button' onClick={() => changeModalMode(!hiddenMode)}><img src={dots} alt='' /></button>
                        <div className={hiddenMode ? classes.openModal : classes.hiddenModal} onBlur={() => changeModalMode(!hiddenMode)}>
                            {/* <span className={classes.modalLink}>
                                Настройки
                            </span> */}
                            <span className={classes.modalLink} >
                                <label className={classes.label}>
                                    Загрузить фото профиля
                                    <input type={'file'} className={classes.invisible} onChange={(e) => savePhoto(e.target.files[0])} />
                                </label>
                            </span>

                            <NavLink className={classes.modalLink} to='/editprofile'   /* '/mypage/editprofile' */> 
                                Редактировать профиль
                            </NavLink>
                        </div>
                    </div>
                :
                <div className={classes.followWrapper}>
                    {followed ?
                        <button disabled={followingInProgress} className={classes.followButton} onClick={() => unFollow()} >
                            <span className={classes.followText}>Отписаться </span>
                        </button>
                        :
                        <button disabled={followingInProgress} className={classes.followButton} onClick={() => follow()}>
                            <span className={classes.followText}>Подписаться</span>
                        </button>}
                    {/* <button onClick={() => startDialog()}>
                        написать сообщение
                    </button> */}
                </div>
            }

        </section>

        <Skills skills={skills} isOwner={isOwner} />
        
        <div>
            <h2>Контакты</h2>
            <div>{profile.contacts.facebook}</div>
            <div>{profile.contacts.website}</div>
            <div>{profile.contacts.github}</div>
            <div></div>
            
            
            
        </div>
        <div></div>
    </div>
}



export default MyPageContainer;

