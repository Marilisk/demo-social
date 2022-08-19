import React, { useState } from "react";
import classes from './MyPage.module.css';
import defaultAvatar from './../../images/default_Avatar.jpg';
import dots from './../../images/myPage/menu-dots.svg';
import EditProfileForm from './EditProfileFormContainer.jsx';
import { NavLink } from "react-router-dom";
import MainWrapper from "../../MainWrapper";
import TestForm from "./EditProfileForm";

const MyPage = (props) => {
    
    const [hiddenMode, changeModalMode] = useState(false);
    const expandModal = () => {
        !hiddenMode ? changeModalMode(true) : changeModalMode(false);  
    }

    const addSkillToKit = (id) => {
        props.addSkillToKit(id);  
    }    
    let skillKitItems = props.skills.filter( s => s.isSelected );
    let possibleItems = props.skills.filter( s => !s.isSelected );

    return <div className={classes.main}>
        <section className={classes.headFlexWrapper}>
            
            <div className={classes.avaWrapper}>
                <img alt="" 
                     className={classes.userAva} 
                     src={!props.profile ? defaultAvatar : props.profile.photos.small } 
                />
            </div>

            <div className={classes.profile}>
                <h2>{props.login}</h2>
                <span className={classes.description}>
                    {props.city}
                </span>
                <span className={classes.description}>
                    {props.followers}
                </span>
                <span className={classes.description}>
                    {/* Обо мне: { props.profile.aboutMe } */}
                </span>
            </div>


            <div className={classes.editBlock}>
                <button  type='button' onClick={expandModal}><img src={dots} /></button>
                <div className={ hiddenMode ? classes.openModal : classes.hiddenModal } onBlur={expandModal}>
                    <span className={classes.modalLink}>
                        Настройки
                    </span>
                    <span className={classes.modalLink} onClick={ () => props.switchShowAppMode()}>
                        Поделиться    
                    </span>
                    <NavLink className={classes.modalLink} to='/editprofile'>
                        Редактировать профиль
                    </NavLink>
                    
                </div>
            </div>

            
        </section>
    
        <section className={classes.skillsWrapper}>
            
            <div>
                <h2>Навыки</h2>
                <div className={classes.plusIcon}></div>
                <div className={classes.editIcon}></div>
            </div>

            <div>
                <div className={classes.skillKit} >
                    {skillKitItems.map( s => <span className={classes.selectedSkill} key={s.id}>{s.skill}</span>) }
                </div>
                <div className={classes.skillPanel}>
                    <p>Возможно, вам стоит добавить в профиль эти навыки:</p>
                    <div>
                        {possibleItems.map( s => <span onClick={ () => addSkillToKit(s.id)} className={classes.freeSkill} key={s.id} >+ {s.skill}</span>) }
                    </div>
                </div>
            </div>

        </section>
        <div>
            <h2>Контакты</h2>
        </div>
        <div></div>
    </div>
}




export default MyPage;

