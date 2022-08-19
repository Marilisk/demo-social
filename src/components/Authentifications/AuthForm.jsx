import { Formik, Field, Form} from "formik";
import React from "react";
import classes from './AuthForm.module.css';

const AuthForm = props => {
    return <>
            <div className={classes.wrapperModal}>
                <svg className={classes.roundedElement}>
                    <rect  x="0" y="0" rx="20" ry="20" width="50" height="50" fill='#DB7093'/>
                </svg>
                <svg className={classes.lowerElement}>
                    <rect  x="0" y="0" rx="0" ry="0" width="20" height="20" fill='#DB7093'/>
                </svg>
                <svg className={classes.upperElement}>
                    <rect x="0" y="0" rx="20" ry="20" width="53" height="53" fill='#0072E1'/>
                </svg> 

            
                <div className={classes.modal}>

                <p className={classes.authHeader}>Войти в сервис</p>
                <p className={classes.commonText}>через аккаунты в соцсетях</p>
                                
                <div className={classes.socialEntry}>
                    <a className={`${classes.socialItem} ${classes.yandex}`} href='/auth/yandex'>  </a>
                    <a className={`${classes.socialItem} ${classes.fb}`}></a>
                    <a className={`${classes.socialItem} ${classes.google}`}></a>
                </div>
                <p className={`${classes.commonText} ${classes.commonTextSmall}`} >или</p>

                <div className={classes.newUserForm}>
                    
                    <div className={classes.field}>
                        <input className={classes.input} placeholder="Имя пользователя" id='UserEmail'></input>
                    </div>
                    <div className={classes.field}>
                        <input className={classes.input} placeholder="Пароль" id='UserPassword' />
                        <div className={classes.iconEye} ></div>
                    </div>

                    <div className={classes.actions}>
                        <div className={classes.forgotPassword}>
                            <a className={classes.commonText} >Забыли пароль?</a>
                        </div>
                        <input type='submit' className={classes.inputSubmit} value='Войти' />
                    
                    <p className={classes.commonText} href='' >
                        Eщё не зарегистрированы? <a className={classes.registerLink}>Зарегистрируйтесь</a>
                    </p>
                    </div>

                </div>
                </div>
            
            </div>
                  
    </>
}

export default AuthForm;