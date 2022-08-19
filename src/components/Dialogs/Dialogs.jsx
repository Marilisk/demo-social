import React from "react";
import classes from './Dialogs.module.css';
import DialogsItem from './DialogItem/DialogItem.jsx';
import { useFormik } from 'formik';

const validate = values => {
    const errors = {};
    if (!values.newMessageBody) {
        errors.newMessageBody = 'напишите хоть что-нибудь';
    } else if (values.newMessageBody.length > 30) {
        errors.newMessageBody = 'длина сообщения не может быть больше 30 символов';
    } 
    return errors;
}

const AddMessageForm = (props) => {
    const formik = useFormik({
        initialValues: {
            newMessageBody: '',
        },
        validate,
        onSubmit: (values, actions) => {
            props.sendMessage(values.newMessageBody);
            actions.resetForm({
                newMessageBody: '',                                 
            });
        }
    })
    return <form onSubmit={formik.handleSubmit}>
                <div>
                    <textarea name={'newMessageBody'}
                              id={'newMessageBody'} 
                              placeholder={"введите сообщение"}
                              value={formik.values.newMessageBody}
                              onChange={formik.handleChange}   
                    /> 
                </div>
                <div>
                    <button type={'submit'}>отправить</button> 
                </div>            
    </form>
}

const Dialogs = (props) => {
    let dialogsElements = props.dialogsPage.dialogsData.map( elem => <DialogsItem path={elem.id} name={elem.name} key={elem.id} /> );
    let messagesElements = props.dialogsPage.messages.map( elem => <div key={elem.id} className={classes.message}>{elem.text}</div> );

    return <div className={classes.dialogs}>   
        <div className={classes.dialogsItems}>
            {dialogsElements}
        </div>
        <div className={classes.dialogsItems}>
            {messagesElements}
        </div>
        
        <div>
            <AddMessageForm {...props} />
        </div>
        
    </div>

}

export default Dialogs;