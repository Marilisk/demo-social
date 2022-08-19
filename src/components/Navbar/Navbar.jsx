import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';

const Navbar = function(props) {
  return <div>
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to='/profile' className={navDo => navDo.isActive ? classes.active : classes.item } >
          <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M21,24H19V18.957A2.96,2.96,0,0,0,16.043,16H7.957A2.96,2.96,0,0,0,5,18.957V24H3V18.957A4.963,4.963,0,0,1,7.957,14h8.086A4.963,4.963,0,0,1,21,18.957Z"/><path d="M12,12a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,12ZM12,2a4,4,0,1,0,4,4A4,4,0,0,0,12,2Z"/></g></svg>
          <p>Profile</p>
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/dialogs' className={navDo => navDo.isActive ? classes.active : classes.item } >
        <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M24,16v8H16a8,8,0,0,1-6.92-4,10.968,10.968,0,0,0,2.242-.248A5.988,5.988,0,0,0,16,22h6V16a5.988,5.988,0,0,0-2.252-4.678A10.968,10.968,0,0,0,20,9.08,8,8,0,0,1,24,16ZM18,9A9,9,0,0,0,0,9v9H9A9.01,9.01,0,0,0,18,9ZM2,9a7,7,0,1,1,7,7H2Z"/></svg>
        <p>Messages</p>
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/users' className={navDo => navDo.isActive ? classes.active : classes.item }>
          <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M6.349,11H3a1,1,0,0,0-1,1v3H0V12A3,3,0,0,1,3,9H7.537A5.977,5.977,0,0,0,6.349,11ZM21,9H16.463a5.977,5.977,0,0,1,1.188,2H21a1,1,0,0,1,1,1v3h2V12A3,3,0,0,0,21,9Zm-5,4a4,4,0,1,0-4,4A4,4,0,0,0,16,13Zm-2,0a2,2,0,1,1-2-2A2,2,0,0,1,14,13Zm4,8a3,3,0,0,0-3-3H9a3,3,0,0,0-3,3v3H8V21a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v3h2ZM22,4a4,4,0,1,0-4,4A4,4,0,0,0,22,4ZM20,4a2,2,0,1,1-2-2A2,2,0,0,1,20,4ZM10,4A4,4,0,1,0,6,8,4,4,0,0,0,10,4ZM8,4A2,2,0,1,1,6,2,2,2,0,0,1,8,4Z"/></svg>
          <p>Users</p>
        </NavLink>
      </div>
      <div className={`${classes.item} ${classes.space}`}>
        <NavLink to='/login' className={navDo => navDo.isActive ? classes.active : classes.item }>
          <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M6.349,11H3a1,1,0,0,0-1,1v3H0V12A3,3,0,0,1,3,9H7.537A5.977,5.977,0,0,0,6.349,11ZM21,9H16.463a5.977,5.977,0,0,1,1.188,2H21a1,1,0,0,1,1,1v3h2V12A3,3,0,0,0,21,9Zm-5,4a4,4,0,1,0-4,4A4,4,0,0,0,16,13Zm-2,0a2,2,0,1,1-2-2A2,2,0,0,1,14,13Zm4,8a3,3,0,0,0-3-3H9a3,3,0,0,0-3,3v3H8V21a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v3h2ZM22,4a4,4,0,1,0-4,4A4,4,0,0,0,22,4ZM20,4a2,2,0,1,1-2-2A2,2,0,0,1,20,4ZM10,4A4,4,0,1,0,6,8,4,4,0,0,0,10,4ZM8,4A2,2,0,1,1,6,2,2,2,0,0,1,8,4Z"/></svg>
          <p>Login</p>
        </NavLink>
      </div>

      <div className={classes.item}>
        <NavLink to='/news' className={navDo => navDo.isActive ? classes.active : classes.item } >
          <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M11,11H0V3A3,3,0,0,1,3,0h8ZM2,9H9V2H3A1,1,0,0,0,2,3Z"/><path d="M24,11H13V0h8a3,3,0,0,1,3,3ZM15,9h7V3a1,1,0,0,0-1-1H15Z"/><path d="M11,24H3a3,3,0,0,1-3-3V13H11ZM2,15v6a1,1,0,0,0,1,1H9V15Z"/><path d="M21,24H13V13H24v8A3,3,0,0,1,21,24Zm-6-2h6a1,1,0,0,0,1-1V15H15Z"/></g></svg>
          <p>Публикации</p>
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/try' className={navDo => navDo.isActive ? classes.active : classes.item }>
        <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0ZM22,12a9.941,9.941,0,0,1-1.646,5.482A5.288,5.288,0,0,1,19,13.99V12H13a1,1,0,0,1-1-1V10h3V6h2.914l1.109-1.109A9.969,9.969,0,0,1,22,12Zm-19.951.963L6.086,17H10a1,1,0,0,1,1,1v3.949A10.016,10.016,0,0,1,2.049,12.963ZM13,21.949V18a3,3,0,0,0-3-3H6.914L2.163,10.249A9.978,9.978,0,0,1,17.456,3.63l-.37.37H13V8H10v3a3,3,0,0,0,3,3h4a7.2,7.2,0,0,0,2.072,5.063A9.969,9.969,0,0,1,13,21.949Z"/></g></svg>
        <p>Try</p>
        </NavLink>

      </div> 
      <div className={classes.item}>
        <NavLink to='/settings' className={navDo => navDo.isActive ? classes.active : classes.item }>
          <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><title>01-Diagram</title><path d="M2,20.976v-21H0v21a3,3,0,0,0,3,3H24v-2H3A1,1,0,0,1,2,20.976Z"/><path d="M22.5,3.976H17l2.793,2.793L15.5,11.062l-2-2L6.281,16.281,7.7,17.7l5.805-5.8,2,2,5.707-5.707L24,10.976v-5.5A1.5,1.5,0,0,0,22.5,3.976Z"/></svg>
          <p>Для тестов</p>
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/authForm' className={navDo => navDo.isActive ? classes.active : classes.item }>
          <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M2,21V3A1,1,0,0,1,3,2H8V0H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H8V22H3A1,1,0,0,1,2,21Z"/><path d="M24,13l0-2-16.444.031,4.323-4.324L10.463,5.293,5.877,9.879a3,3,0,0,0,0,4.242l4.586,4.586,1.414-1.414L7.614,13.03Z"/></svg>
          <p>Красивая форма</p>
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/formikForm' className={navDo => navDo.isActive ? classes.active : classes.item }>
          <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M2,21V3A1,1,0,0,1,3,2H8V0H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H8V22H3A1,1,0,0,1,2,21Z"/><path d="M24,13l0-2-16.444.031,4.323-4.324L10.463,5.293,5.877,9.879a3,3,0,0,0,0,4.242l4.586,4.586,1.414-1.414L7.614,13.03Z"/></svg>
          <p>Formik форма</p>
        </NavLink>
      </div>
      <div className={classes.item} >
        <NavLink to='/mypage' className={navDo => navDo.isActive ? classes.active : classes.item }>
          <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M13.338.833a2,2,0,0,0-2.676,0L0,10.429v10.4a3.2,3.2,0,0,0,3.2,3.2H20.8a3.2,3.2,0,0,0,3.2-3.2v-10.4ZM15,22.026H9V17a3,3,0,0,1,6,0Zm7-1.2a1.2,1.2,0,0,1-1.2,1.2H17V17A5,5,0,0,0,7,17v5.026H3.2a1.2,1.2,0,0,1-1.2-1.2V11.319l10-9,10,9Z"/></g></svg>
          <p>Моя страница</p>
        </NavLink>
      </div>         
    </nav>

  </div>

}

export default Navbar;