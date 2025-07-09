import React, { useEffect, useState } from "react";
import { Form, Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signInAsync } from '../../store/Auth/AuthSlice';
import { useTranslation } from "react-i18next";


export default function LoginForm() {
    const {t} = useTranslation();

    const LoginSchem = Yup.object({
        login: Yup.string()
            .min(5, t('auth.validation.login.min'))
            .max(20, t('auth.validation.login.max'))
            .required(t('auth.validation.login.required')),

        password: Yup.string()
            .min(5, t('auth.validation.password.min'))
            .required(t('auth.validation.password.required'))
    });

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
                <h3 className={styles.thinWelcome}>{t('auth.welcome')}</h3>
                <h3 className={styles.loginTitle}>{t('auth.loginTitle')}</h3>
                <p className={`${styles.smallLable} ${styles.smallLableMargin}`}>{t('auth.continue')}</p>

                <Formik
                    initialValues={{
                    login: '',
                    password: '',
                    rememberMe: false
                    }}
                    enableReinitialize={true}
                    validationSchema={LoginSchem}
                    onSubmit={async (values, { resetForm }) => {
                    await dispatch(signInAsync({
                        username: values.login,
                        password: values.password,
                        rememberMe: values.rememberMe
                    }));
                    resetForm();
                    }}
                >
                {({ isValid, dirty }) => (
                    <Form className={styles.loginForm}>
                        <div className={styles.inputBlock}>
                            <label htmlFor='login' className={styles.smallLable}>
                                {t('auth.usernameLabel')}
                            </label>
                            <Field
                                id='login'
                                type="text"
                                name='login'
                                placeholder={t('auth.usernamePlaceholder')}
                                className={styles.formInput}
                            />
                            <div className={styles.formErrorWrapper}>
                                <ErrorMessage name='login' component='p' className={styles.formError} />
                            </div>
                        </div>

                        <div className={styles.inputBlock}>
                            <label htmlFor='password' className={styles.smallLable}>
                                {t('auth.passwordLabel')}
                            </label>
                            <div className={styles.iconContainer}>
                                <Field
                                id='password'
                                type={swowPassword ? 'text' : 'password'}
                                name='password'
                                placeholder={t('auth.passwordPlaceholder')}
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
                            <Field
                                id='rememberMe'
                                type="checkbox"
                                name="rememberMe"
                                className={styles.rememberMeCheckbox}
                            />
                            <label htmlFor="rememberMe" className={styles.rememberMeLable}>
                                {t('auth.remember')}
                            </label>
                        </div>

                        <p className={styles.formTotalError}>{error}</p>

                        <button type='submit' className={`${styles.loginButton} ${isValid && dirty ? styles.active : ''}`} disabled={!(isValid && dirty)}>
                            {t('auth.loginButton')}
                        </button>
                    </Form>
            )}
                </Formik>
            </div>
    </div>
    )
}

