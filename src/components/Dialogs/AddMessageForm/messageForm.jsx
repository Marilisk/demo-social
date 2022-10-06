import React, { useState } from "react";
import c from './messageForm.module.css';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import { sendMessageAC } from "../../redux/dialogs-reducer";


export const MessageForm = ({userId}) => {
    const dispatch = useDispatch();

    const [textHeight, increaseHeight] = useState(0);
    const disabled = false;
    const errors = {};
    const validate = values => {
        if (!values.body) {
            errors.body = 'нельзя отправить пустое сообщение';
        } else if (values.body.length > 300) {
            errors.body = 'длина сообщения не может быть больше 300 символов';
        } 
        increaseHeight(Math.floor(values.body.length / 50));
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validate,
        onSubmit: (values, actions) => {
            let body = values.body;
            dispatch(sendMessageAC(userId, body));
            actions.resetForm({values: formik.initialValues});
        } 
    })

    return <form onSubmit={formik.handleSubmit}>
        <div className={c.textareaWrap}>
            <textarea name='body'
                        id={'body'}
                        onChange={formik.handleChange}
                        value={formik.values.body}
                        className={c.textarea}
                        style={{height: textHeight + 3 + 'em'}}
            />
            <button type={'submit'} className={c.button} disabled={disabled} >
                        <span>отправить</span>
            </button>   
        </div>
        
    </form>
} 

