import React from "react";
import { useFormik } from "formik";
import c from './EditForm.module.css';
import { NavLink, useNavigate } from "react-router-dom";

const EditProfileForm  = ({updateProfile, profile, disabled}) => {
    let navigate = useNavigate();
    
    const formik = useFormik( {
        initialValues: {
            aboutMe: profile.aboutMe,
            facebook: "facebook.com",
            github: "github.com",
            instagram: "instagra.com/sds",
            mainLink: '',
            twitter: "https://twitter.com/@sdf",
            vk: '',
            website: '',
            youtube: '',
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            fullName: profile.fullName,
        },
        onSubmit: (values) => {  
            let data = {...values}; 
            data.contacts = {
                facebook: values.facebook,
                github: values.github,
                instagram: values.instagram,
                mainLink: values.mainLink,
                twitter: values.twitter,
                vk: values.vk,
                website: values.website,
                youtube: values.youtube,
            };
            delete data.facebook;
            delete data.github;
            delete data.instagram;
            delete data.mainLink;
            delete data.twitter;
            delete data.vk;
            delete data.website;
            delete data.youtube;

            console.log(data);
            let json  = JSON.stringify(data);
            
            updateProfile(json, data); 
            navigate('/mypage');
        },
    });

    return <div className={c.fullPageBlock}>
        <form onSubmit={formik.handleSubmit} className={c.form}>
            <div>            
                <input 
                    type='text'
                    id={'aboutMe'}
                    name={'aboutMe'}
                    placeholder={'опишите себя'}
                    onChange={formik.handleChange}
                    value={formik.values.aboutMe}
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
                <label htmlFor='lookingForAJob'> В поиске работы
                <input type={'checkbox'}
                        id='lookingForAJob'
                        name='lookingForAJob'
                        onChange={formik.handleChange}
                        value={formik.values.lookingForAJob}
                        className={c.checkbox}
                        checked={formik.values.lookingForAJob}
                />
                </label>
            </div>
            <div className={c.inputWithLabelWrap}>
                <span className={c.label}>какая работа нужна</span>
                <input 
                    type='text'
                    id={'lookingForAJobDescription'}
                    name={'lookingForAJobDescription'}
                    onChange={formik.handleChange}
                    value={formik.values.lookingForAJobDescription}
                    className={c.input}
                />
            </div>
            <div className={c.inputWithLabelWrap}>
                <span className={c.label}>facebook</span>
                <input 
                    type='text'
                    id={'facebook'}
                    name={'facebook'}
                    onChange={formik.handleChange}
                    value={formik.values.facebook}
                    className={c.input}
                />
            </div>
            <div className={c.inputWithLabelWrap}>
                <span className={c.label}>ссылки</span>
                <input 
                    type='text'
                    id={'mainLink'}
                    name={'mainLink'}
                    onChange={formik.handleChange}
                    value={formik.values.mainLink}
                    className={c.input}
                />
            </div>
            <div className={c.inputWithLabelWrap}>
                <span className={c.label}>сайт</span>
                <input 
                    type='text'
                    id={'website'}
                    name={'website'}
                    onChange={formik.handleChange}
                    value={formik.values.website}
                    className={c.input}
                />
            </div>
            <div className={c.inputWithLabelWrap}>
                <span className={c.label}>youtube</span>
                <input 
                    type='text'
                    id={'youtube'}
                    name={'youtube'}
                    onChange={formik.handleChange}
                    value={formik.values.youtube}
                    className={c.input}
                />
            </div>
            
            <div className={c.buttonsWrap}>
                <button disabled={disabled} type={"submit"} className={c.submit}>сохранить</button>
                <NavLink className={c.cancel} to='/mypage'>
                    отменить
                </NavLink>
            </div>
        </form>
    </div>
}

export default EditProfileForm;



