import React from 'react';
import BigButton from '../BigButton/BigButton';
import BigTitle from '../BigTitle/BigTitle';
import styles from './AllTasks.module.scss';
import TasksTable from './TasksTable/TasksTable';
import TasksSearch from './TasksSearch/TasksSearch';
import StatusButton from './StatusButton/StatusButton';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStatus } from '../../store/Tasks/TasksSlice';

export default function AllTasks() {
    const dispatch = useDispatch();

    const activeStatus = useSelector((state) => state.tasks.activeStatus);

    const StatusButtons = [
        { text: 'Approved' },
        { text: 'Re work' },
        { text: 'Pending' },
        { text: 'In progress' },
    ];

    const saveActiveStatus = (status) => {
        if (status === activeStatus) {
            dispatch(setActiveStatus(''));
        } else {
            dispatch(setActiveStatus(status));
        }
    };

    return (
        <>
            <div className={styles.SerachBlock}>
                <TasksSearch/>
                <div className={styles.StatusButtonsBlock}>
                    {StatusButtons.map((button) => (
                        <StatusButton
                            key={button.text}
                            text={button.text}
                            isActive={activeStatus === button.text}
                            onClick={() => saveActiveStatus(button.text)}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.allTasksTitle}>
                <BigTitle text={activeStatus ? activeStatus : 'All Tasks'} />
                <BigButton text="Create Task" style="purple" />
            </div>
            <TasksTable/>
        </>
    );
}