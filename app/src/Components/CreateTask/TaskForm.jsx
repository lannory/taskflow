import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BigTitle from '../BigTitle/BigTitle';
import BigButton from '../BigButton/BigButton';
import styles from './TaskForm.module.scss';
import SelectTaskDeveloper from './SelectTaskDeveloper/SelectTaskDeveloper';
import SelectTaskProject from './SelectTaskProject/SelectTaskProject';
import { useTranslation } from "react-i18next";

export default function TaskForm({
    initialValues,
    onSubmit,
    users = [],
    isEdit
}) {
    const { t } = useTranslation();
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Task name is required')
            .min(2, 'Minimum 2 characters'),
        description: Yup.string()
            .max(300, 'Maximum 300 characters'),
        duoDate: Yup.string()
            .required('Deadline is required'),
        userId: Yup.string()
            .required('Developer is required'),
        projectId: Yup.string()
            .required('Project is required'),
    });
    // console.log("initialValues in TaskForm:", initialValues);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <BigTitle text={isEdit ? t('tasks.form.editTitle') : t('tasks.form.createTitle')} />
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    const payload = isEdit
                        ? values
                        : {
                            ...values,
                            id: Date.now(),
                            tick: false,
                            taskCreated: new Date().toISOString().split('T')[0],
                            status: 'In progress',
                        };
                    onSubmit(payload);
                    if (!isEdit) resetForm();
                }} enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title" className={styles.label}>
                                {t('tasks.form.projectName')}
                            </label>
                            <Field
                                type="text"
                                name="title"
                                className={styles.input}
                                placeholder={t('tasks.form.namePlaceholder')}
                            />
                            <ErrorMessage name="title" component="div" className={styles.error} />
                        </div>

                        <div className={styles.formGroup}>
                            <Field
                                as="textarea"
                                name="description"
                                rows="4"
                                className={styles.textarea}
                                placeholder={t('tasks.form.descriptionPlaceholder')}
                            />
                            <ErrorMessage name="description" component="div" className={styles.error} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="duoDate" className={styles.label}>
                                {t('tasks.form.deadline')}
                            </label>
                            <Field type="date" name="duoDate" className={styles.input} />
                            <ErrorMessage name="duoDate" component="div" className={styles.error} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="userId" className={styles.label}>
                                {t('tasks.form.manager')}
                            </label>
                            <Field name="userId">
                                {({ field, form }) => (
                                    <SelectTaskDeveloper
                                        users={users}
                                        value={field.value}
                                        onChange={value => form.setFieldValue('userId', value)}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="userId" component="div" className={styles.error} />
                        </div>





                        <div className={styles.formGroup}>
                            <label htmlFor="projectId" className={styles.label}>
                                {t('tasks.form.projectPlaceholder')}
                            </label>
                            <Field name="projectId">
                                {({ field, form }) => (
                                    <SelectTaskProject
                                        value={field.value}
                                        onChange={value => form.setFieldValue('projectId', value)}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="projectId" component="div" className={styles.error} />
                        </div>

                        <BigButton disabled={isSubmitting} text={isEdit ? t('tasks.form.saveButton') : t('tasks.form.createButton')} style="purple" />
                    </Form>
                )}
            </Formik>
        </div>
    )

};