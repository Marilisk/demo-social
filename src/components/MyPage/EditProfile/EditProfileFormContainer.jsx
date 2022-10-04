import React from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { updateProfileThunkCreator } from '../../redux/profile-reducer.js';
import EditProfileForm from "./EditProfileForm.jsx";

const EditProfileContainer = ({}) => {
    const dispatch = useDispatch();
    const updateProfile = useCallback( (json, data) => {
        //console.log(data);
        dispatch(updateProfileThunkCreator(json, data));
    })
    const profile = useSelector(state => state.profilePage.profile);

    const disabled = useSelector(state => state.profilePage.buttonDisabled);

    return <div>
        <EditProfileForm 
            updateProfile={updateProfile}
            profile={profile} 
            disabled={disabled}
        />
    </div>
}


export default EditProfileContainer;

