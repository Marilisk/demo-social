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

export const MyModal = ({savePhoto}) => {

    const [hiddenMode, changeModalMode] = useState(false);

    return <div className={classes.editBlock}>
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
}



