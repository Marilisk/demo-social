import React, { useState } from "react";
import { useFormik } from 'formik';
import classes from './EditForm.module.css';
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useCallback } from "react";
import { switchShowAppModeAC } from '../redux/app-reducer.js';

const EditProfileForm = (props) => {
    const formik = useFormik({
        initialValues: {
            aboutMe: '',
            skype: "",
            vk: "",
            facebook: "",
            icq: "",
            email: "",
            googlePlus: "",
            twitter: "",
            instagram: "",
            whatsApp: "",
            lookingForAJob: '',
            lookingForAJobDescription: 'Ищу работу, знаю это это и это',
            fullName: '',
            userId: '',
        },
        onsubmit: values => {
            console.log(values);
            //props.switchShowAppMode();
        }
    });
    console.log(props);
    console.log(formik);
    

    return <div className={classes.wrapper}>
        <form onSubmit={formik.handleSubmit}>
            <div className={classes.mainInfo} >
                <input id='fullName'
                    placeholder="fullName"
                    name='fullName'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                />
                <input id='aboutMe'
                    placeholder="aboutMe"
                    name={'aboutMe'}
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.aboutMe}
                />
            </div>

            {/* <div className={classes.contacts}>
                <input id='skype'
                    placeholder="skype"
                    name='skype'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.skype}
                />
                <input id='vk'
                    placeholder="vk"
                    name='vk'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.vk}
                />
                <input id='facebook'
                    placeholder="facebook"
                    name='facebook'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.facebook}
                />
                <input id='icq'
                    placeholder="icq"
                    name='icq'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.icq}
                />
                <input id='email'
                    placeholder='email'
                    name='email'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <input id='googlePlus'
                    placeholder='googlePlus'
                    name='googlePlus'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.googlePlus}
                />
                <input id='twitter'
                    placeholder='twitter'
                    name='twitter'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.twitter}
                />
                <input id='instagram'
                    placeholder='instagram'
                    name='instagram'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.instagram}
                />
                <input id='whatsApp'
                    placeholder='whatsApp'
                    name='whatsApp'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.whatsApp}
                />
            </div>

            <div className={classes.jobBlock} >
            
                <input type={'checkbox'}
                       id='lookingForAJob'
                       name='lookingForAJob'
                       onChange={formik.handleChange}
                       value={formik.values.lookingForAJob}
                />
                <label for='lookingForAJob'> В поиске работы</label>
 
                <input id='lookingForAJobDescription'
                    placeholder="lookingForAJobDescription"
                    name='lookingForAJobDescription'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.lookingForAJobDescription}
                />
            </div> */}
 
            <button type={'submit'}>Обновить профиль</button>
        </form>
    </div>
}

const EditProfileContainer = (props) => {

    const dispatch = useDispatch();

    const switchShowAppMode = useCallback( () => {
        dispatch(switchShowAppModeAC())
    })

    return <EditProfileForm switchShowAppMode={switchShowAppMode} />
}

let mapStateToProps = (state) => {

}


export default EditProfileContainer;

