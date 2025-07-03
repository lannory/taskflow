import React, { useState } from 'react';
import InputField from '../../Components/CreateTask/InputField/InputField';
import TextAreaField from '../../Components/CreateTask/TextAreaField/TextAreaField';
import DateField from '../../Components/CreateTask/DateField/DateField';
import ManagerSelect from '../../Components/CreateTask/SelectField/ManagerSelect';
import BigButton from '../../Components/BigButton/BigButton';
import styles from "./CreateTaskForm.module.scss";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CreateTaskForm = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [manager, setManager] = useState('');
  const {t} = useTranslation();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { projectName, description, deadline, manager };
    console.log('Created Task:', taskData);
  };

  return (
    <div className={styles.create_task}>
      <div className={styles.createTaskHeader}>
        <h2 className={styles.titleTask}>{t('tasks.form.createTitle')}</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.createTaskForm}>
        <InputField
          label={t('tasks.form.projectName')}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder={t('tasks.form.projectName')}
        />
        <TextAreaField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('tasks.form.descriptionPlaceholder')}
        />
        <DateField
          label={t('tasks.form.deadline')}
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder={t('tasks.form.datePlaceholder')}
        />
        <ManagerSelect
          value={manager}
          onChange={(value) => setManager(value)}
          placeholder={t('tasks.form.managerPlaceholder')}
        />
        <BigButton text={t('tasks.form.createTitle')} style="purple" />
      </form>
    </div>
  );
};

export default CreateTaskForm;
