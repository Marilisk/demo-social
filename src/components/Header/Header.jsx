import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import logoutArrow from './../../images/logoutArrow.svg';
import logo from './../../images/logo-jun-net.png';
import loupe from './../../images/header/loupe.png';
import portrait from './../../images/header/portrait.svg';
import { SearchBar } from './SearchBar';

export const Header = ({ isAuth, login, id, setLogin, logout, search, nothingFound }) => {

  return <header className={classes.header}>
    <img className={classes.appLogo} href='' alt='' src={logo} />

    <SearchBar search={search} nothingFound={nothingFound}  />
    {nothingFound && <span>никого не нашлось...</span>}

    <div className={classes.loginBlockNotAuth}>
      {isAuth
        ?
        <NavLink to='/mypage'>
          <div className={classes.loginnedName} >
            <div><img src={portrait} alt='' className={classes.portrait} /></div>
            <span>{login}</span>
          </div>
        </NavLink>
        :
        <NavLink className={classes.loginLink} to='/login'>Войти</NavLink>
      }

    </div>
    <div className={classes.logoutArrowWrapper}>
      {isAuth && <a onClick={logout}>
        <img className={classes.logoutArrow} src={logoutArrow} /></a>}
    </div>

  </header>
}

export default Header;