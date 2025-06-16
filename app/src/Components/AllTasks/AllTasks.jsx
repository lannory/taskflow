import React, { useState } from 'react';
import BigButton from '../BigButton/BigButton';
import BigTitle from '../BigTitle/BigTitle';
import styles from './AllTasks.module.scss';
import TasksTable from './TasksTable/TasksTable';
import TasksSearch from './TasksSearch/TasksSearch';
import StatusButton from './StatusButton/StatusButton';
import tasks from '../../../public/tasks';

export default function AllTasks() {

    const [searchValue, setSearchValue] = useState('');

    const filteredTasks = tasks.filter(task =>  
        task.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            <div className={styles.SerachBlock}>
                <TasksSearch  value={searchValue} setValue={setSearchValue} />
                <div className={styles.StatusButtonsBlock}>
                    <StatusButton text='Approved' type='green' />
                    <StatusButton text='Re work' type='red' />
                    <StatusButton text='Pending' type='yellow' />
                </div>
            </div>
            <div className={styles.allTasksTitle}>
                <BigTitle text='All Tasks' />
                <BigButton text='Create Task' style='purple' />
            </div>
            <TasksTable tasks={filteredTasks} />
        </>
    )
}
