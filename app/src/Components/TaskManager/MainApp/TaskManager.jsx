import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import TextAreaField from '../TextAreaField/TextAreaField';
import DateField from '../DateField/DateField';
import SelectField from '../SelectField/SelectField';
import SubmitButton from '../SubmitButton/SubmitButton';
import styles from"./CreateTaskForm.module.scss";

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
        <button
          className={styles.createTaskButton} onClick={handleSubmit}
          type="button"
        >
          Create Task
        </button>
      </div>

      <formonSubmit
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
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="DD/MM/YYYY"
        />

        <SelectField
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          options={['Anna', 'John', 'Kira']}
          placeholder="Select Project Manager"
        />

        <SubmitButton text="Create Task" />
      </formonSubmit>
    </div>
  );
};

export default CreateTaskForm;
