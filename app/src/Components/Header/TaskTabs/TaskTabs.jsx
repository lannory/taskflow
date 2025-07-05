import styles from './TaskTabs.module.scss';
import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStatus } from '../../../store/Tasks/TasksSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function TaskTabs() {

  const navigate = useNavigate();

  const { t } = useTranslation();

  const tabs = [
    { text: t('tabs.all'), dispatch: '' },
    { text: t('tabs.approved'), dispatch: 'Approved' },
    { text: t('tabs.pending'), dispatch: 'Pending' },
    { text: t('tabs.completed'), dispatch: 'Completed' },
  ];

  const dispatch = useDispatch();
  const activeStatus = useSelector((state) => state.tasks.activeStatus);

  return (
    <div className={styles.taskTabs}>
      {tabs.map((tab) => (
        <button
          key={tab.text}
          type="button"
          className={`${styles.taskTabsBtn} ${activeStatus === tab.dispatch ? styles.active : ''}`}
          onClick={() => {
            dispatch(setActiveStatus(tab.dispatch))
            navigate('/alltasks')
          }}
        >
          {tab.text}
        </button>
      ))}
    </div>
  );
}
