import React from "react";
import { Form, Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.scss';
import BigButton from "../BigButton/BigButton";

const LoginSchem = Yup.object({
    login: Yup.string()
        .min(5, 'Login must be longer than 5 characters')
        .max(20, 'Login must be shorter than 20 characters')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required')
})


export default function LoginForm() {

    const handleLogin = (values) => {
        console.log(values)
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
                    onSubmit={(values, { resetForm }) => {
                        handleLogin(values)
                        resetForm();
                    }}
                >
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
                            <Field id='password' type="password" name='password' placeholder='Enter your Password' className={styles.formInput} />
                            <div className={styles.formErrorWrapper}>
                                <ErrorMessage name='password' component='p' className={styles.formError} />
                            </div>
                        </div>
                        <div className={styles.rememberMeInput}>
                            <Field id='rememberMe' type="checkbox" name="rememberMe" className={styles.rememberMeCheckbox} />
                            <label htmlFor="rememberMe" className={styles.rememberMeLable}>Remembr me</label>
                        </div>
                        <button type='submit' className={`${styles.loginButton} `}>Login</button>
                        {/* ${styles.active} */}
                        {/* <p className={styles.registerCTA}>
                        Don’t have an Account ?
                        <span className={styles.regButton}>Register</span>
                    </p> */}
                    </Form>
                </Formik>
            </div>
        </div>
    )
}