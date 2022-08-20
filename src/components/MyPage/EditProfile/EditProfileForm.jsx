import React from "react";
import { useFormik } from "formik";
import c from './EditForm.module.css';
import { NavLink } from "react-router-dom";

const EditProfileForm  = (props) => {
    let json;
    const formik = useFormik( {
        initialValues: {
            aboutMe: '',
            contacts: {
                facebook: "facebook.com",
                github: "github.com",
                instagram: "instagra.com/sds",
                mainLink: null,
                twitter: "https://twitter.com/@sdf",
                vk: "vk.com/dimych",
                website: null,
                youtube: null
            },
            lookingForAJob: true,
            lookingForAJobDescription: "не ищу",
            fullName: ""
        },
        onSubmit: (values) => {            
            json  = JSON.stringify(values);
            console.log(JSON.parse(json));
            props.updateProfile(json);

        },
    });

    function close() {

    }

    return <div className={c.fullPageBlock}>
        <form onSubmit={formik.handleSubmit} className={c.form}>
            <div>            
                <input 
                    type='text'
                    id={'aboutMe'}
                    name={'aboutMe'}
                    placeholder={'aboutMe'}
                    onChange={formik.handleChange}
                    value={formik.values.aboutMe}
                    className={c.input}
                />
            </div>

            <div className={c.inputWithLabelWrap}>
                <span className={c.label}>Фамилия</span>
                <input 
                    type='text'
                    id={'fullName'}
                    name={'fullName'}
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                    className={c.input}
                />
            </div>
            <div className={c.inputWithLabelWrap}>
                <span className={c.label}>Имя</span>
                <input 
                    type='text'
                    id={'fullName'}
                    name={'fullName'}
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                    className={c.input}
                />
            </div>
            <div className={c.lookingForAJob}>
                <label htmlFor='lookingForAJob'> В поиске работы</label>
                <input type={'checkbox'}
                        id='lookingForAJob'
                        name='lookingForAJob'
                        onChange={formik.handleChange}
                        value={formik.values.lookingForAJob}
                        className={c.checkbox}
                />
                
            </div>
            
            <div className={c.buttonsWrap}>
                <button type={"submit"} className={c.submit}>сохранить</button>
                <NavLink className={c.cancel} to='/mypage'>
                    отменить
                </NavLink>
            </div>
        </form>
    </div>
}

export default EditProfileForm;



