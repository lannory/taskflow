import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BigTitle from '../BigTitle/BigTitle';
import BigButton from '../BigButton/BigButton';
import styles from './ProjectForm.module.scss';

export default function ProjectForm({
    initialValues = { name: '', description: '', managerId: '' },
    onSubmit,
    users = [],
    isEdit
  }) {

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Project name is required')
            .min(2, 'Minimum 2 characters'),
        description: Yup.string()
            .max(300, 'Maximum 300 characters'),
        managerId: Yup.string()
            .required('Manager is required'),
    });

    return(
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <BigTitle text={isEdit ? 'Edit Project' : 'Create Project'}/>
                <BigButton text={isEdit ? 'Save Project' : 'Create Project'} style='purple'/>
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
                        <label htmlFor="name" className={styles.label}>Project Name</label>
                        <Field type="text"
                                name="name"
                                className={styles.input}
                                placeholder='Enter Project name'
                            />
                        <ErrorMessage name="name" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                        {/* <label htmlFor="description" className={styles.label}>Description</label> */}
                        <Field as="textarea"
                                name="description"
                                rows="4"
                                className={styles.textarea}
                                placeholder="Enter a description..."
                        />
                        <ErrorMessage name="description" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="managerId" className={styles.label}>Project Manager</label>
                        <Field name="managerId" as="select" className={styles.select}>
                            <option value="">Select Project Manager</option>
                            {users.filter(user => user.role === 'manager').map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name} ({user.role})
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="managerId" component="div" className={styles.error} />
                    </div>

                    <BigButton disabled={isSubmitting} text={isEdit ? 'Save Project' : 'Create Project'} style='purple'/>
                </Form>
            )}
            </Formik>
        </div>
    )
};
