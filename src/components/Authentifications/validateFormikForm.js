import React from "react";
import ReactDOM from 'react-dom';
import { Formik, Field, Form, useFormik  } from 'formik';
import { connect } from "react-redux";
import classes from './AuthForm.module.css';
import { loginFormThunkCreator } from '../redux/auth-reducer.js';

const validate = () => {
    
}