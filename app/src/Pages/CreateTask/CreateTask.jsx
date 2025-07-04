import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputField from '../../Components/CreateTask/InputField/InputField';
import TextAreaField from '../../Components/CreateTask/TextAreaField/TextAreaField';
import DateField from '../../Components/CreateTask/DateField/DateField';
import UserSelect from '../../Components/CreateTask/SelectField/UserSelect';
import BigButton from '../../Components/BigButton/BigButton';
import styles from "./CreateTaskForm.module.scss";


const CreateTaskForm = () => {
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
        <h2 className={styles.titleTask}>Create Task</h2>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className={styles.createTaskForm}>
 , ,            <div className={styles.formGroup}>
              <label className={styles.label}>Project Name</label>
              <Field name="projectName">
                {({ field }) => (
                  <InputField
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
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
