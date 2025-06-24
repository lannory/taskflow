import React, { useState } from 'react';
import InputField from '../../Components/CreateTask/InputField/InputField';
import TextAreaField from '../../Components/CreateTask/TextAreaField/TextAreaField';
import DateField from '../../Components/CreateTask/DateField/DateField';
import ManagerSelect from '../../Components/CreateTask/SelectField/ManagerSelect';
import BigButton from '../../Components/BigButton/BigButton';
import styles from "./CreateTaskForm.module.scss";

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
        <h2 className={styles.titleTask}>Create Task</h2>
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
          placeholder="Enter a description..."
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
        <BigButton text='Create Task' style='purple' />
      </form>
    </div>
  );
};

export default CreateTaskForm;
