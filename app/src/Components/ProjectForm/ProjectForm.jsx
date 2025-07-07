import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BigTitle from '../BigTitle/BigTitle';
import BigButton from '../BigButton/BigButton';
import styles from './ProjectForm.module.scss';
import SelectProjectManager from './SelectProjectManager/SelectProjectManager';
import { useTranslation } from "react-i18next";

export default function ProjectForm({
    initialValues = { name: '', description: '', deadline: '', managerId: '' },
    onSubmit,
    users = [],
    isEdit
  }) {
    const {t} = useTranslation();
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Project name is required')
            .min(2, 'Minimum 2 characters'),
        description: Yup.string()
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
                 {/* <BigButton text={isEdit ? 'Save Project' : 'Create Project'} style='purple'/> */}
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                onSubmit(values);
                if (!isEdit) resetForm();
                }}
            >
                {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>
                            {t('projects.form.projectName')}
                        </label>
                        <Field
                            type="text"
                            name="name"
                            className={styles.input}
                            placeholder={t('projects.form.namePlaceholder')}
                        />
                        <ErrorMessage name="name" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                        <Field
                            as="textarea"
                            name="description"
                            rows="4"
                            className={styles.textarea}
                            placeholder={t('projects.form.descriptionPlaceholder')}
                        />
                        <ErrorMessage name="description" component="div" className={styles.error} />
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

            <BigButton disabled={isSubmitting} text={isEdit ? 'Save Project' : 'Create Project'} style='purple' />
          </Form>
        )}
      </Formik>
    </div>
    )

};
