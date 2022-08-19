import React from "react";
import s from './ProfileInfo.module.css';
import { useState, useEffect } from 'react';


const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    let activateEditMode = () => { 
        setEditMode(true);
    } 
    let deActivateEditMode = (status) => {
        setEditMode(false);
        props.updateStatusThunkCreator(status);
    }

    let onStatusChange = (event) => {
        setStatus(event.currentTarget.value);
    }

    let resetStatus = () => {
        setStatus('');
    }
    
    return <div>
            { ! editMode && 
            <div>
                <span className={s.span} onClick={activateEditMode} >
                    {status || '*****'}
                </span> 
            </div>
            }    
            { editMode && 
                <div>
                    <input  onChange={onStatusChange} 
                            autoFocus={true} 
                            className={s.statusInput} 
                            onBlur={deActivateEditMode} 
                            value={status} />
                    <button onClick={resetStatus}>обновить статус</button>
                </div>
            }
            
    </div>
    
}

export default ProfileStatusWithHooks;