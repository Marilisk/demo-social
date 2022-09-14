import React, { useState } from "react";
import classes from './MyPage.module.css';
import defaultAvatar from './../../images/default_Avatar.jpg';
import dots from './../../images/myPage/menu-dots.svg';
// import EditProfileFormContainer from './EditProfile/EditProfileFormContainer.jsx';
import { NavLink } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { setLoginThunkCreator } from '../redux/auth-reducer.js';
import { addSkillToKitAC, getUserProfileThunkCreator } from '../redux/profile-reducer.js';
import { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { createSelector } from 'reselect'

const MyPageContainerOld = (props) => {
    /* const isAuth = useSelector(state => state.auth.isAuth, shallowEqual);
    const login = useSelector(state => state.auth.login, shallowEqual);
    const id = useSelector(state => state.auth.id, shallowEqual);
    const city = useSelector(state => state.profilePage.city, shallowEqual);
    const followers = useSelector(state => state.profilePage.followersAmount, shallowEqual);
    const skills = useSelector(state => state.profilePage.skills, shallowEqual); 
    const profile = useSelector(state => state.profilePage.profile, shallowEqual); */ 

    /* const {isAuth, login, id, city, followers, skills, profile} = useSelector(({

    })) */

    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(getUserProfileThunkCreator(props.id));
        console.log('MyPageContainer useEffect. ');
    }, [/* isAuth, dispatch*/ ]); 

    return <MyPage {...props}
        /* isAuth={isAuth} 
        login={login} 
        id={id} 
        city={city} 
        followers={followers} 
        skills={skills}
        profile={profile} */
    /> 
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login, 
    id: state.auth.id, 
    city: state.profilePage.city, 
    followers: state.profilePage.followersAmount, 
    skills: state.profilePage.skills,
    profile: state.profilePage.profile,
});

const MyPage = (/* {isAuth, login, id, city, followers, skills, profile} */) => {

    const isAuth = useSelector(state => state.auth.isAuth, shallowEqual);
    const login = useSelector(state => state.auth.login, shallowEqual);
    const id = useSelector(state => state.auth.id, shallowEqual);
    const city = useSelector(state => state.profilePage.city, shallowEqual);
    const followers = useSelector(state => state.profilePage.followersAmount, shallowEqual);
    const skills = useSelector(state => state.profilePage.skills, shallowEqual); 
    const profile = useSelector(state => state.profilePage.profile, shallowEqual);

    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(getUserProfileThunkCreator(id));
        console.log('MyPageContainer useEffect. ');
    }, [ isAuth, dispatch ]); 
    
    const [hiddenMode, changeModalMode] = useState(false);
        
    let skillKitItems = skills.filter( s => s.isSelected );
    let possibleItems = skills.filter( s => !s.isSelected ); 

    return <div className={classes.main}>
        <section className={classes.headFlexWrapper}>
            
            <div className={classes.avaWrapper}>
                <img alt="" 
                     className={classes.userAva} 
                     src={ (profile&&profile.photos.small) ? profile.photos.small : defaultAvatar } 
                />
            </div>

            <div className={classes.profile}>
                <h2>{login}</h2>
                <span className={classes.description}>
                    {city}
                </span>
                <span className={classes.description}>
                    подписчики: {followers}
                </span>
                <span className={classes.description}>
                    { (profile&&profile.aboutMe) && <p>Обо мне: {profile.aboutMe}</p> }
                </span>
            </div>


            <div className={classes.editBlock}>
                <button  type='button' onClick={()=>changeModalMode(!hiddenMode)}><img src={dots} alt=''/></button>
                <div className={ hiddenMode ? classes.openModal : classes.hiddenModal } onBlur={()=>changeModalMode(!hiddenMode)}>
                    <span className={classes.modalLink}>
                        Настройки
                    </span>
                    <span className={classes.modalLink} /* onClick={} */ >
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
                    {skillKitItems.map( s => {
                        return <span className={classes.selectedSkill} key={s.id}>{s.skill}</span>;
                    })} 
                </div>
                <div className={classes.skillPanel}>
                    <p>Возможно, вам стоит добавить в профиль эти навыки:</p>
                    <div>
                        {possibleItems.map( s => <span onClick={ () => dispatch(addSkillToKitAC(s.id)) } className={classes.freeSkill} key={s.id} >+ {s.skill}</span>) }
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

const MyPageContainer = connect(mapStateToProps, null)(MyPage);

export default MyPage;

