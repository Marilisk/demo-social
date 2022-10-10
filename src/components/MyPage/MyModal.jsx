import React, { useState } from "react";
import classes from './MyPage.module.css';
import dots from './../../images/myPage/menu-dots.svg';
import { NavLink } from "react-router-dom";

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



