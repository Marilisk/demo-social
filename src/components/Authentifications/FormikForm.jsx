import React, {useState} from "react";
import { BrowserRouter as Router, Navigate, NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

import { useFormik } from 'formik';
import { connect } from "react-redux";
import classes from './formikForm.module.css';
import { loginFormThunkCreator } from './../redux/auth-reducer.js';
import lock from './../../images/loginForm/lockIcon.svg';
import errorIcon from './../../images/loginForm/error.svg';

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'введите e-mail';
    } else if (values.email.length > 30) {
        errors.email = 'подозрительно длинный e-mail';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'пока это не похоже на e-mail...';
    }
    return errors;
}

const FormikForm = (props) => {  
    function togglePasswordVisibility(value) {
        showPasswordVisibility(value);
    }
    const [showPassword, showPasswordVisibility] = useState(false);

    let location = useLocation();
    let from = location.state?.from?.pathname || "/mypage";
    console.log('from ' + from);
    let navigate = useNavigate();   

    const formik = useFormik({
        initialValues: {
            email: props.email,
            password: '',
            rememberMe: false, 
        },
        validate, 
        onSubmit: (values, actions) => {
            props.loginFormThunkCreator(values);
            actions.resetForm({
                email: '',
                password: '',
                rememberMe: null,                                    
            });
            navigate(from, {replace: true});
        }
    });

    /* if (props.isAuth) {
        return <Navigate to={'/profile'} replace={true}/>
    }; */ 
    
    return <section className={classes.main}>
        <div className={classes.modal}>
            <div className={classes.iconWrapper}>
                <img className={classes.lockIcon} src={lock} />
            </div>

            <h2>Пожалуйста, авторизуйтесь:</h2>  

            <form onSubmit={formik.handleSubmit} >                   
                <div className={classes.fiedsWrapper}>
                    <div className={classes.inputWrapper}>
                        <input id={'email'}
                            name={'email'}
                            placeholder={'Почта'}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className={classes.input}
                            autoFocus={true} 
                        />
                    </div>
                    {formik.errors.email ? <div>{formik.errors.email}</div> : null }

                    <div className={classes.inputWrapper}>
                        <input id={'password'} 
                            name={'password'} 
                            placeholder={'Пароль'}
                            type={showPassword ? 'text' : 'password'} 
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className={classes.input}
                        />

                        <div className={classes.iconEye} onClick={ showPassword ? () => togglePasswordVisibility(false) : () => togglePasswordVisibility(true)  } > </div>
                    </div>
                    <div className={classes.checkBoxContainer}>
                        <input id={'rememberMe'} 
                                name={'rememberMe'} 
                                type={'checkbox'} 
                                value={formik.values.rememberMe}
                                onChange={formik.handleChange}
                                className={classes.checkBox}
                        />
                        <label htmlFor={'rememberMe'} className={classes.checkBoxLabel}>
                            <p>запомнить меня</p>
                        </label>
                        
                    </div>

                    {props.errorMessages && <div className={classes.errorMessage}><img src={errorIcon}/> {props.errorMessages}</div>}

                    <button type={'submit'} className={classes.submitButton}>
                        Войти
                    </button>

                    <NavLink to={from}>
                        продолжить без авторизации
                    </NavLink>

                </div>
            </form>
        </div>
    </section>
       
}

let mapStateToProps = (state) => ({
    email: state.auth.email,
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    errorMessages: state.auth.errorMessages,
});
let mapDispatchToProps = (dispatch) => {
    return {
        loginFormThunkCreator: (formData) => {
            dispatch(loginFormThunkCreator(formData));
        },      
    };    
};

let ConnectedForm = connect (mapStateToProps, mapDispatchToProps) (FormikForm);

export default ConnectedForm;