import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';


const Navbar = function ({ isAuth, isOwner }) {

  return <div>
    <nav className={classes.nav}>

      {isAuth &&
        <NavLink to='/mypage' className={(navDo) => (navDo.isActive && isOwner) ? classes.active : classes.item}>
          <div className={classes.buttonWrapper} >
            <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M13.338.833a2,2,0,0,0-2.676,0L0,10.429v10.4a3.2,3.2,0,0,0,3.2,3.2H20.8a3.2,3.2,0,0,0,3.2-3.2v-10.4ZM15,22.026H9V17a3,3,0,0,1,6,0Zm7-1.2a1.2,1.2,0,0,1-1.2,1.2H17V17A5,5,0,0,0,7,17v5.026H3.2a1.2,1.2,0,0,1-1.2-1.2V11.319l10-9,10,9Z" /></g></svg>
            <p>Моя страница</p>
          </div>
        </NavLink>}

      <NavLink to='/posts' className={navDo => navDo.isActive ? classes.active : classes.item} >
        <div className={classes.buttonWrapper} >
          <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M21,24H19V18.957A2.96,2.96,0,0,0,16.043,16H7.957A2.96,2.96,0,0,0,5,18.957V24H3V18.957A4.963,4.963,0,0,1,7.957,14h8.086A4.963,4.963,0,0,1,21,18.957Z" /><path d="M12,12a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,12ZM12,2a4,4,0,1,0,4,4A4,4,0,0,0,12,2Z" /></g></svg>
          <p>Посты</p>
        </div>
      </NavLink>

      <NavLink to='/dialogs' className={navDo => navDo.isActive ? classes.active : classes.item} >
        <div className={classes.buttonWrapper}>
          <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M24,16v8H16a8,8,0,0,1-6.92-4,10.968,10.968,0,0,0,2.242-.248A5.988,5.988,0,0,0,16,22h6V16a5.988,5.988,0,0,0-2.252-4.678A10.968,10.968,0,0,0,20,9.08,8,8,0,0,1,24,16ZM18,9A9,9,0,0,0,0,9v9H9A9.01,9.01,0,0,0,18,9ZM2,9a7,7,0,1,1,7,7H2Z" /></svg>
          <p>Сообщения</p>
        </div>
      </NavLink>

      <NavLink to='/users' className={navDo => navDo.isActive ? classes.active : classes.item}>
        <div className={classes.buttonWrapper}>
          <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M6.349,11H3a1,1,0,0,0-1,1v3H0V12A3,3,0,0,1,3,9H7.537A5.977,5.977,0,0,0,6.349,11ZM21,9H16.463a5.977,5.977,0,0,1,1.188,2H21a1,1,0,0,1,1,1v3h2V12A3,3,0,0,0,21,9Zm-5,4a4,4,0,1,0-4,4A4,4,0,0,0,16,13Zm-2,0a2,2,0,1,1-2-2A2,2,0,0,1,14,13Zm4,8a3,3,0,0,0-3-3H9a3,3,0,0,0-3,3v3H8V21a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v3h2ZM22,4a4,4,0,1,0-4,4A4,4,0,0,0,22,4ZM20,4a2,2,0,1,1-2-2A2,2,0,0,1,20,4ZM10,4A4,4,0,1,0,6,8,4,4,0,0,0,10,4ZM8,4A2,2,0,1,1,6,2,2,2,0,0,1,8,4Z" /></svg>
          <p>Пользователи</p>
        </div>
      </NavLink>

      <NavLink to='/news' className={navDo => navDo.isActive ? classes.active : classes.item} >
        <div className={classes.buttonWrapper}>
          <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M11,11H0V3A3,3,0,0,1,3,0h8ZM2,9H9V2H3A1,1,0,0,0,2,3Z" /><path d="M24,11H13V0h8a3,3,0,0,1,3,3ZM15,9h7V3a1,1,0,0,0-1-1H15Z" /><path d="M11,24H3a3,3,0,0,1-3-3V13H11ZM2,15v6a1,1,0,0,0,1,1H9V15Z" /><path d="M21,24H13V13H24v8A3,3,0,0,1,21,24Zm-6-2h6a1,1,0,0,0,1-1V15H15Z" /></g></svg>
          <p>Публикации</p>
        </div>
      </NavLink>

    </nav>
  </div>
}

const NavbarContainer = ({initialised, isAuth}) => {
  const isOwner = useSelector(state => state.profilePage.isOwner)
  return <Navbar isAuth={isAuth} isOwner={isOwner} />
}

export default NavbarContainer;