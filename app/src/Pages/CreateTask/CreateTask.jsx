import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputField from '../../Components/CreateTask/InputField/InputField';
import TextAreaField from '../../Components/CreateTask/TextAreaField/TextAreaField';
import DateField from '../../Components/CreateTask/DateField/DateField';
import UserSelect from '../../Components/CreateTask/SelectField/UserSelect';
import BigButton from '../../Components/BigButton/BigButton';
import styles from "./CreateTaskForm.module.scss";
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
    deadline: '',
    usersId: '',
  };

  const validationSchema = Yup.object().shape({
    projectName: Yup.string()
      .required('Project name is required')
      .min(2, 'Minimum 2 characters'),
    description: Yup.string()
      .max(300, 'Maximum 300 characters'),
    deadline: Yup.string()
      .required('Deadline is required'),
      usersId: Yup.string()
      .required('User is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log('Created Task:', values);
    resetForm();
    // navigate('/tasks'); // если нужно перенаправление
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
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className={styles.createTaskForm}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Project Name</label>
              <Field name="projectName">
                {({ field }) => (
                  <InputField
                    value={field.value}
                    onChange={field.onChange}
                    name={field.name}
                    placeholder="Project Name"
                  />
                )}
              </Field>
              <ErrorMessage name="projectName" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <Field name="description">
                {({ field }) => (
                  <TextAreaField
                    value={field.value}
                    onChange={field.onChange}
                    name={field.name}
                    placeholder="Enter a description..."
                  />
                )}
              </Field>
              <ErrorMessage name="description" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Project Deadline</label>
              <Field name="deadline">
                {({ field }) => (
                  <DateField
                    value={field.value}
                    onChange={(e) => setFieldValue('deadline', e.target.value)}
                    placeholder="DD/MM/YYYY"
                  />
                )}
              </Field>
              <ErrorMessage name="deadline" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Assign User</label>
              <Field name="usersId">
                {({ field }) => (
                  <UserSelect
                    value={field.value}
                    onChange={(value) => setFieldValue('usersId', value)}
                    placeholder="Select Project User"
                  />
                )}
              </Field>
              <ErrorMessage name="usersId" component="div" className={styles.error} />
            </div>

            <BigButton
              text="Create Task"
              style="purple"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateTaskForm;
