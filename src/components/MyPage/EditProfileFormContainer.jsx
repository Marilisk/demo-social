import React, { useState } from "react";
import { useFormik } from 'formik';
import classes from './EditForm.module.css';
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useCallback } from "react";
import { switchShowAppModeAC } from '../redux/app-reducer.js';
import { useSelector } from "react-redux";
import { updateProfileThunkCreator } from '../redux/profile-reducer.js';
import EditProfileForm from "./EditProfileForm.jsx";

const EditProfileContainer = (props) => {

    const dispatch = useDispatch();
    const switchShowAppMode = useCallback( () => {
        dispatch(switchShowAppModeAC());
    })
    const updateProfile = useCallback( (data) => {
        dispatch(updateProfileThunkCreator(data));
    })

    const city = useSelector(state => state.profilePage.city);

    return <div>

        <EditProfileForm updateProfile={updateProfile}
                  city={city} />
    </div>
}


export default EditProfileContainer;

