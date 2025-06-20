import React, { useEffect, useState } from "react";
import { Form, Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signInAsync } from '../../store/Auth/AuthSlice';

const LoginSchem = Yup.object({
    login: Yup.string()
        .min(5, 'Login must be longer than 5 characters')
        .max(20, 'Login must be shorter than 20 characters')
        .required('Required'),
    password: Yup.string()
        .min(5, 'Password must be at least 6 characters')
        .required('Required')
})


export default function LoginForm() {

    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);
    // const error = 'шо тут помилка';
    const [swowPassword, setSwowPassword] = useState(false);

    useEffect(() => {
        if (error) {
            console.log(error)
        }
    })

    const togglePassword = () => {
        setSwowPassword(!swowPassword);
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginFormMainBlock}>
                <h3 className={styles.thinWelcome}>Welcome !</h3>
                <h3 className={styles.loginTitle}>Log in to </h3>
                <p className={`${styles.smallLable} ${styles.smallLableMargin}`}>Continue</p>
                <Formik
                    initialValues={{
                        login: '',
                        password: '',
                        rememberMe: false
                    }}
                    enableReinitialize={true}
                    validationSchema={LoginSchem}
                    onSubmit={async (values, { resetForm }) => {
                        await dispatch(signInAsync({ username: values.login, password: values.password }))
                        resetForm();
                    }}
                >
                    {({ isValid, dirty }) => (
                        <Form className={styles.loginForm}>
                            <div className={styles.inputBlock}>
                                <label htmlFor='login' className={styles.smallLable}>User name or ID</label>
                                <Field id='login' type="text" name='login' placeholder='Enter your user name or ID' className={styles.formInput} />
                                <div className={styles.formErrorWrapper}>
                                    <ErrorMessage name='login' component='p' className={styles.formError} />
                                </div>
                            </div>
                            <div className={styles.inputBlock}>
                                <label htmlFor='password' className={styles.smallLable}>Password</label>
                                <div className={styles.iconContainer}>
                                    <Field
                                        id='password'
                                        type={swowPassword ? 'text' : 'password'}
                                        name='password'
                                        placeholder='Enter your Password'
                                        className={styles.formInput}
                                    />
                                    <div className={styles.passIcon} onClick={togglePassword}>
                                        {swowPassword
                                            ? <i className="fa-solid fa-eye"></i>
                                            : <i className="fa-solid fa-eye-slash"></i>}
                                    </div>
                                </div>
                                <div className={styles.formErrorWrapper}>
                                    <ErrorMessage name='password' component='p' className={styles.formError} />
                                </div>
                            </div>

                            <div className={styles.rememberMeInput}>
                                <Field id='rememberMe' type="checkbox" name="rememberMe" className={styles.rememberMeCheckbox} />
                                <label htmlFor="rememberMe" className={styles.rememberMeLable}>Remembr me</label>
                            </div>
                            <p className={styles.formTotalError}>{error}</p>
                            <button type='submit' className={`${styles.loginButton} ${isValid && dirty ? styles.active : ''}`} disabled={!(isValid && dirty)}>Login</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

