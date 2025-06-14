import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import TextAreaField from '../TextAreaField/TextAreaField';
import DateField from '../DateField/DateField';
import ManagerSelect from '../SelectField/ManagerSelect';
import SubmitButton from '../SubmitButton/SubmitButton';
import styles from"./CreateTaskForm.module.scss";
import BigTitle from '../../BigTitle/BigTitle'
import BigButton from '../../BigButton/BigButton'

const CreateTaskForm = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [manager, setManager] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { projectName, description, deadline, manager };
    console.log('Created Task:', taskData);
  };

  return (
    <div className={styles.create_task}>
      <div className={styles.createTaskHeader}>
        <BigTitle text='Create Task'/>
        <BigButton text='Create Task' style='purple'/>
      </div>
      <form
        onSubmit={handleSubmit}
        className={styles.createTaskForm}
      >
        <InputField
          label="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
        />
        <TextAreaField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A concise, 5-10 minute presentation that outlines the key design decisions. This presentation covers:"
        />
        <DateField
          label="Project Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="DD/MM/YYYY"
        />
        <ManagerSelect
          value={manager}
          onChange={(value) => setManager(value)}
          placeholder="Select Project Manager"
        />
        <BigButton text='Create Task' style='purple'/>
      </form>
    </div>
  );
};

export default CreateTaskForm;
