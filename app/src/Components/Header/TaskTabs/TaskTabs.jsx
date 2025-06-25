import styles from './TaskTabs.module.scss';
import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStatus } from '../../../store/Tasks/TasksSlice';
import { useNavigate } from 'react-router-dom';

export default function TaskTabs() {

  const navigate = useNavigate();

  const tabs = [
    { text: 'All', dispatch: '', },
    { text: 'Approved', dispatch: 'Approved', },
    { text: 'Pending', dispatch: 'Pending', },
    { text: 'Completed', dispatch: 'Completed', },
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
