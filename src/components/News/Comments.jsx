import React from "react";
import css from './news.module.css';

const Comments = (props) => {

    return  <div className={css.commentsBlock}>
        <div>
            Последние зарегистрированные пользователи:
        </div>
        
        <div className={css.newUsersList}>
            {props.comments.map( c => <div className={css.newUsersItem} key={c.id} >{c.name}</div>)}
        </div>
    </div>
}

export default Comments;