import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BigTitle from '../BigTitle/BigTitle';
import BigButton from '../BigButton/BigButton';
import styles from './ProjectForm.module.scss';
import SelectProjectManager from './SelectProjectManager/SelectProjectManager';
import { useTranslation } from "react-i18next";

export default function ProjectForm({
    initialValues,
    onSubmit,
    users = [],
    isEdit
  }) {
    const {t} = useTranslation();
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Project name is required')
            .min(2, 'Minimum 2 characters'),
        desc: Yup.string()
            .max(300, 'Maximum 300 characters'),
        deadline: Yup.string()
            .required('Deadline is required'),
        managerId: Yup.string()
            .required('Manager is required'),
    });

    return(
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <BigTitle text={isEdit ? t('projects.form.editTitle') : t('projects.form.createTitle')} />
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    const payload = isEdit
                        ? values
                        : { ...values, id: Date.now(), category: 'newProj', img: '01' };
                    onSubmit(payload);
                    if (!isEdit) resetForm();
                }} enableReinitialize
            >
                {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title" className={styles.label}>
                            {t('projects.form.projectName')}
                        </label>
                        <Field
                            type="text"
                            name="title"
                            className={styles.input}
                            placeholder={t('projects.form.namePlaceholder')}
                        />
                        <ErrorMessage name="title" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                        <Field
                            as="textarea"
                            name="desc"
                            rows="4"
                            className={styles.textarea}
                            placeholder={t('projects.form.descriptionPlaceholder')}
                        />
                        <ErrorMessage name="desc" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="deadline" className={styles.label}>
                            {t('projects.form.deadline')}
                        </label>
                        <Field type="date" name="deadline" className={styles.input} />
                        <ErrorMessage name="deadline" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="managerId" className={styles.label}>
                            {t('projects.form.manager')}
                        </label>
                        <Field name="managerId">
                            {({ field, form }) => (
                            <SelectProjectManager
                                users={users}
                                value={field.value}
                                onChange={value => form.setFieldValue('managerId', value)}
                            />
                            )}
                        </Field>
                        <ErrorMessage name="managerId" component="div" className={styles.error} />
                    </div>

                    <BigButton disabled={isSubmitting} text={isEdit ? t('projects.form.saveButton') : t('projects.form.createButton')}  style="purple"/>
                </Form>
                )}
            </Formik>
    </div>
    )

};
