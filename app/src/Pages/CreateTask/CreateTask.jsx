import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../store/Tasks/TasksSlice';
import BigTitle from '../../Components/BigTitle/BigTitle';
import TextAreaField from '../../Components/CreateTask/TextAreaField/TextAreaField';
import UserSelect from '../../Components/CreateTask/UserSelect/UserSelect';
import BigButton from '../../Components/BigButton/BigButton';
import ProjectSelect from "../../Components/CreateTask/ProjectSelect/ProjectSelect"
import styles from "./CreateTaskForm.module.scss";

export default function CreateTaskForm({
  initialValues = {
    title: '',
    description: '',
    duoDate: '',
    userID: '',
    prodjectID: ''
  },
  onSubmit,
  users = [],
  isEdit
}) {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.tasks);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Task title is required')
      .min(2, 'Minimum 2 characters'),
    description: Yup.string()
      .max(300, 'Maximum 300 characters'),
    duoDate: Yup.string()
      .required('Deadline is required'),
    userID: Yup.string()
      .required('User is required'),
    prodjectID: Yup.string()
      .required('Project is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log('Form submitted with values:', values);
    try {
      const result = await dispatch(createTask(values)).unwrap();
      console.log('Task created successfully:', result);
      if (!isEdit) resetForm();
      if (onSubmit) onSubmit(values);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className={styles.create_task}>
      <div className={styles.createTaskHeader}>
        <BigTitle text={isEdit ? 'Edit Task' : 'Create Task'} />
      </div>

      {error && <div className={styles.error}>Error: {error}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.createTaskForm}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>Task Title</label>
              <Field type="text"
                name="title"
                className={styles.input}
                placeholder='Enter task title'
              />
              <ErrorMessage name="title" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <Field name="description">
                {({ field }) => (
                  <TextAreaField
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Enter a description..."
                  />
                )}
              </Field>
              <ErrorMessage name="description" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="duoDate" className={styles.label}>Task Deadline</label>
              <Field type="date"
                name="duoDate"
                className={styles.input}
              />
              <ErrorMessage name="duoDate" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="userID" className={styles.label}>Assign User</label>
              <Field name="userID">
                {({ field, form }) => (
                  <UserSelect
                    value={field.value}
                    onChange={value => form.setFieldValue('userID', value)}
                  />
                )}
              </Field>
              <ErrorMessage name="userID" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="prodjectID" className={styles.label}>Project</label>
              <Field name="prodjectID">
                {({ field, form }) => (
                  <ProjectSelect
                    value={field.value}
                    onChange={value => form.setFieldValue('prodjectID', value)}
                    placeholder="Select Project"
                  />
                )}
              </Field>
              <ErrorMessage name="prodjectID" component="div" className={styles.error} />
            </div>

            <BigButton
              text={isEdit ? 'Save Task' : 'Create Task'}
              style="purple"
              disabled={isSubmitting}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}