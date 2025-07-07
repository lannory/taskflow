import React, { useEffect } from "react";
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

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const CreateTaskForm = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [manager, setManager] = useState('');
  const {t} = useTranslation();
  const navigate = useNavigate();

  const initialValues = {
    projectName: '',
    description: '',
    duoDate: '',
    userID: '',
    prodjectID: ''
  },
  onSubmit,
  isEdit
}) {
  const dispatch = useDispatch();
  const { error, tasks } = useSelector(state => state.tasks);

  // Отслеживаем изменения в tasks
  useEffect(() => {
    console.log('Tasks in store updated. Total tasks:', tasks.length);
  }, [tasks.length]);

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
    console.log('=== FORM SUBMISSION START ===');
    console.log('Form submitted with values:', values);
    console.log('Form validation passed');
    console.log('Current tasks in store:', tasks.length);
    
    try {
      console.log('Dispatching createTask action...');
      const result = await dispatch(createTask(values)).unwrap();
      console.log('Task created successfully in store:', result);
      console.log('Total tasks in store after creation:', tasks.length + 1);
      
      if (!isEdit) {
        console.log('Resetting form...');
        resetForm();
      }
      
      if (onSubmit) {
        console.log('Calling onSubmit callback...');
        onSubmit(values);
      }
      
      console.log('=== FORM SUBMISSION COMPLETE ===');
    } catch (error) {
      console.error('Failed to create task:', error);
      console.log('=== FORM SUBMISSION FAILED ===');
    }
  };

  return (
    <div className={styles.create_task}>
      <div className={styles.createTaskHeader}>

        <h2 className={styles.titleTask}>{t('tasks.form.createTitle')}</h2>
      </div>

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