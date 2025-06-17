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
    const [activeStatus, setActiveStatus] = useState('')

    const StatusButtons = [
        { text: 'Approved', type: 'green' },
        { text: 'Re work', type: 'red' },
        { text: 'Pending', type: 'yellow' },
    ];

    const saveActiveStatus = (status) => {
        if(status === activeStatus){
            setActiveStatus('')
        } else {
            setActiveStatus(status)
        }

    }

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            <div className={styles.SerachBlock}>
                <TasksSearch value={searchValue} setValue={setSearchValue} />
                <div className={styles.StatusButtonsBlock}>
                    {StatusButtons.map((button) => (
                        <StatusButton
                            key={button.text}
                            text={button.text}
                            type={button.type}
                            isActive={activeStatus === button.text}
                            onClick={() => saveActiveStatus(button.text)}
                        />
                    ))}
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
