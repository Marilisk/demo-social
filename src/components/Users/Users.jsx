import React, { useState } from "react";
import styles from './users.module.css';
import defaultAva from './../../images/default_Avatar_new.png';
import { NavLink } from 'react-router-dom';

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 5}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
        let pages = [];
        for (let i=1; i <= pagesCount; i++) {
            pages.push(i);
        };

    let portionCount = Math.ceil(pagesCount / portionSize); // количество порций
    let [portionNumber, setPortionNumber] = useState(1); // номер порции
    let rightPortionPageNumber = portionNumber * portionSize; // правая граница порции
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; // левая граница порции
    
    const showNextPage = () => {
        setPortionNumber(portionNumber + 1);
    };
    const showPrevPage = () => {
        setPortionNumber(portionNumber - 1);
    }
    console.log(portionNumber);
    return <div className={styles.pageNumbers} >

        <div>
            { portionNumber > 1 && <button className={styles.buttons} onClick={showPrevPage}>назад</button> }
        </div>
        
        {pages.filter( p => p >= leftPortionPageNumber && p <= rightPortionPageNumber )
            .map( (p) => {
            
                return <span key={p} className={(currentPage) === p ? styles.selestedPage : styles.pageNumbers}
                             onClick={ () => onPageChanged(p) } > {p} </span>
            })
        }
        <div>
            { portionNumber < portionCount && <button className={styles.buttons} onClick={showNextPage}>дальше</button> }
        </div>
    </div>
};

let Users = (props) => {

    return  <div className={styles.list} >
        <Paginator totalItemsCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage} 
                   onPageChanged={props.onPageChanged}
                   />

        {props.users.map ( u => <div key={u.id} className={styles.usersList}>
            <NavLink to={'/profile/' + u.id}>
                <div className={styles.avaWrapper}>
                    <img className={styles.userAva} alt='' src={u.photos.small != null ? u.photos.small : defaultAva} ></img>
                </div>
            </NavLink> 
            <NavLink key={u.id * 2} to={'/profile/' + u.id}>
                <div className={styles.userInfo}>
                    <div className={styles.name}>{u.name}</div>
                    <div className={styles.status}>{u.status != null ? u.status : 'В процессе придумывания статуса'}</div>
                    <div className={styles.geo}>Russia, Moscow</div>
                </div>
            </NavLink>  

            <div>
                {u.followed ? 
                    <button disabled={props.followingInProgress.some( id => id === u.id)} className={styles.followButton} onClick={ () => {
                        props.unFollow(u.id);                            
                        }
                        } ><span className={styles.followText}>Unfollow </span></button> 
                    : 
                    <button disabled={props.followingInProgress.some( id => id === u.id)} className={styles.followButton} onClick={ () => {
                        props.follow(u.id);     
                        } 
                        } ><span className={styles.followText}>Follow</span></button> 
                }
            </div>
            
        </div>)
    }
    </div>
};

export default Users;