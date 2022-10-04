import React from "react";
import s from './../../MyPage/MyPage.module.css';
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { updateStatusThunkCreator } from "../../redux/profile-reducer.js";
import note from './../../../images/myPage/note.svg';

const ProfileStatusWithHooks = (props) => {
    const dispatch = useDispatch();
    useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => { 
        if (props.isOwner) {
            setEditMode(true);
        } 
    } 
    const deActivateEditMode = () => {
        dispatch(updateStatusThunkCreator(status));
        setEditMode(false);
    }
    let onStatusChange = (value) => {
        setStatus(value);
    }
    
    return <div className={s.statusBlock}>
            { !editMode && 
            <div>
                <span className={s.description} onClick={activateEditMode} >
                    <img src={note} className={s.icon} alt='' />
                    {status || '*****'}
                </span> 
            </div>
            }    
            { editMode && 
                <div>
                    <input  onChange={(event) => onStatusChange(event.currentTarget.value)} 
                            autoFocus={true} 
                            className={s.statusInput} 
                            onBlur={() => deActivateEditMode()} 
                            value={status} />
                    
                </div>
            }
    </div>
    
}

export default ProfileStatusWithHooks;