import React, { useState } from "react";
import classes from './MyPage.module.css';
import defaultAvatar from './../../images/default_Avatar.jpg';
import dots from './../../images/myPage/menu-dots.svg';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePhotoThunkCreator } from '../redux/profile-reducer.js';
import briefcase from './../../images/myPage/briefcase.svg';
import geo from './../../images/myPage/marker.svg';
import note from './../../images/myPage/note.svg';
import ProfileStatusWithHooks from "../Profile/ProfileInfo/ProfileStatusWithHooks";
import EditProfileContainer from "./EditProfile/EditProfileFormContainer";
import { followThunkCreator, unFollowThunkCreator } from "../redux/users-reducer";
import Skills from "./Skills/Skills";

export const MyPage = ({ userId, city, followers, skills, profile, isOwner, status, followingInProgress, followed, startDialog }) => {
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
                            
                            <span className={classes.modalLink} >
                                <label className={classes.label}>
                                    Загрузить фото профиля
                                    <input type={'file'} className={classes.invisible} onChange={(e) => savePhoto(e.target.files[0])} />
                                </label>
                            </span>

                            <NavLink className={classes.modalLink} to='/editprofile' > 
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
                    <button className={classes.writeMsgBtn} onClick={() => startDialog(userId, profile.fullName)}>
                        написать сообщение
                    </button>
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
        {/* <div><MyPostsContainer /> </div> */}
    </div>
}



