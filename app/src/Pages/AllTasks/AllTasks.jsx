import React from 'react';
import BigButton from '../../Components/BigButton/BigButton';
import BigTitle from '../../Components/BigTitle/BigTitle';
import styles from './AllTasks.module.scss';
import TasksTable from '../../Components/AllTasks/TasksTable/TasksTable';
import TasksSearch from '../../Components/AllTasks/TasksSearch/TasksSearch';
import StatusButton from '../../Components/AllTasks/StatusButton/StatusButton';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStatus } from '../../store/Tasks/TasksSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function AllTasks() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {t} = useTranslation();

    const activeStatus = useSelector((state) => state.tasks.activeStatus);

    const tasks = useSelector((state) => state.tasks.tasks)

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
                <TasksSearch />
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
                <BigTitle text={activeStatus ? activeStatus : t("tasks.title")} />
                <BigButton text={t("tasks.btn")} style="purple" onClick={() => navigate('/createtask')}/>
            </div>
            <TasksTable  tasks={tasks}/>
        </>
    );
}