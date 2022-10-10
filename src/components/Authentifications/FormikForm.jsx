import React, {useState} from "react";
import { NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { connect, useDispatch, useSelector } from "react-redux";
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
    const email = useSelector(state => state.auth.email);
    const login = useSelector(state => state.auth.login);
    const isAuth = useSelector(state => state.auth.isAuth);
    const errorMessages = useSelector(state => state.auth.errorMessages);
    const captchaUrl = useSelector(state => state.auth.captchaUrl);

    function togglePasswordVisibility(value) {
        showPasswordVisibility(value);
    }
    const [showPassword, showPasswordVisibility] = useState(false);

    let location = useLocation();
    let from = location.state?.from?.pathname || "/users" ;
    //console.log('from ' + from);
    let navigate = useNavigate(); 
    
    const dispatch = useDispatch();
    const loginForm = (formData) => {
        dispatch(loginFormThunkCreator(formData))
    }

    const formik = useFormik({
        initialValues: {
            email: ''/* email */,
            password: '',
            rememberMe: false, 
            captcha: '',
        },
        validate, 
        onSubmit: (values, actions) => {
            loginForm(values);
            actions.resetForm({
                email: '',
                password: '',
                rememberMe: null,  
                captcha: null,                                  
            });
            
        }
    });
    if (isAuth) {
        navigate(from, {replace: true});
    }
    
    
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
                    { captchaUrl && 
                    <div>
                        <img src={captchaUrl} alt='gh' /> 
                        <input id={'captcha'}
                            name={'captcha'}
                            placeholder={'captcha'}
                            value={formik.values.captcha}
                            onChange={formik.handleChange}
                            className={classes.input} 
                            autoFocus={captchaUrl}
                        />
                    </div>
                    
                    }
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

                    {errorMessages && <div className={classes.errorMessage}><img src={errorIcon}/> {errorMessages}</div>}

                    <button type={'submit'} className={classes.submitButton}>
                        Войти
                    </button>

                    <span className={classes.skip}>
                    <NavLink to={from}>
                        продолжить без авторизации
                    </NavLink>
                    </span>
                </div>
            </form>
        </div>
    </section>
       
}



//let ConnectedForm = connect (mapStateToProps, mapDispatchToProps) (FormikForm);

export default FormikForm;