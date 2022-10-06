import React from "react";
import c from './users.module.css';
import defaultAva from './../../images/default_Avatar_new.png';
import { NavLink } from 'react-router-dom';
import { followThunkCreator, unFollowThunkCreator } from "../redux/users-reducer";
import { useDispatch } from "react-redux";
import Paginator from "./Paginator/Paginator.jsx";
import { SelectUsers } from "./SelectUsers";

const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, followingInProgress, usersDisplayMode, switchUsersMode}) => {
    const dispatch = useDispatch();

    return <div className={c.list} >
            <SelectUsers usersDisplayMode={usersDisplayMode} switchUsersMode={switchUsersMode} />

        <Paginator totalItemsCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
        />

        <section className={c.usersGrid}>
        {users.map(u => <div key={u.id} className={c.usersList}>
            <NavLink to={'/mypage/' + u.id}>
                <div className={c.avaWrapper}>
                    <img className={u.photos.small != null ? c.userAva : c.defaultAva} alt='' src={u.photos.small != null ? u.photos.small : defaultAva} ></img>
                </div>
            </NavLink>
            <NavLink key={u.id * 2} to={'/mypage/' + u.id}>
                <div className={c.userInfo}>
                    <div className={c.name}>{u.name}</div>
                    <div className={c.status}>{u.status != null ? u.status : '...'}</div>
                    <div className={c.geo}>Russia, Moscow</div>
                </div>
            </NavLink>

            <div>
                {u.followed ?
                    <button disabled={followingInProgress.some(id => id === u.id)} className={c.followButton} onClick={() => {
                        dispatch(unFollowThunkCreator(u.id));
                    }
                    } ><span className={c.followText}>Отписаться </span></button>
                    :
                    <button disabled={followingInProgress.some(id => id === u.id)} className={c.followButton} onClick={() => {
                        dispatch(followThunkCreator(u.id));
                    }
                    } ><span className={c.followText}>Подписаться</span></button>
                }
            </div>

        </div>)
        }
        </section>
    </div>
};

export default Users;