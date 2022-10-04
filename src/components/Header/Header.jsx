import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import logoutArrow from './../../images/logoutArrow.svg';
import logo from './../../images/logo-jun-net.png';
import loupe from './../../images/header/loupe.png';
import portrait from './../../images/header/portrait.svg';

const Header = function (props) {
  let auInfo = {
    login: props.login,
    isAuth: props.isAuth,
    id: props.id,
  };

  return <header className={classes.header}>
    <img className={classes.appLogo} href='' alt='' src={logo} />

    <div className={classes.searchBar}>
      <input type={'text'} className={classes.searchInput} />
      <img className={classes.loupe} href='' alt='' src={loupe} />
    </div>

    <div className={classes.loginBlockNotAuth}>
      {props.isAuth
        ?
        <NavLink to='/mypage'>
          <div className={classes.loginnedName} >
            <div><img src={portrait} alt='' className={classes.portrait} /></div>
            <span>{auInfo.login}</span>
          </div>
        </NavLink>
        :
        
        <NavLink className={classes.loginLink} to='/login'>Войти</NavLink>
      }

    </div>
    <div className={classes.logoutArrowWrapper}>
      {props.isAuth && <a onClick={props.logoutFormThunkCreator}>
        <img className={classes.logoutArrow} src={logoutArrow} /></a>}
    </div>

  </header>
}

export default Header;