import React from 'react';
import SmallTitle from '../SmallTitle/SmallTitle';
import styles from './TodaysTask.module.scss';
import { Dropdown, Empty } from 'antd';
import StatusButton from '../AllTasks/StatusButton/StatusButton';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSort, toggleTask, toggleAllTasks, deleteTask, changeTaskStatus, setExtendetRow } from '../../store/Tasks/TasksSlice';
import { useTranslation } from 'react-i18next';

export default function TodaysTask() {

    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const {t} = useTranslation();


    const today = new Date().toISOString().split('T')[0];

    if(tasks.length === 0) {
        return
    }
    let displayedTasks = tasks.filter(task => task.duoDate === today);
    
    

    const getTaskStatuses = (task) => [
        {
            key: 'Approved',
            label: (
                <StatusButton text='Approved' />
            ),
            onClick: (e) => {
                e.domEvent.stopPropagation();
                dispatch(changeTaskStatus({ id: task.id, status: 'Approved' }))
            }
        },
        {
            key: 'Re work',
            label: (
                <StatusButton text='Re work' />
            ),
            onClick: (e) => {
                e.domEvent.stopPropagation();
                dispatch(changeTaskStatus({ id: task.id, status: 'Re work' }))
            }
        },
        {
            key: 'Pending',
            label: (
                <StatusButton text='Pending' />
            ),
            onClick: (e) => {
                e.domEvent.stopPropagation();
                dispatch(changeTaskStatus({ id: task.id, status: 'Pending' }))
            }
        },
        {
            key: 'In progress',
            label: (
                <StatusButton text='In progress' />
            ),
            onClick: (e) => {
                e.domEvent.stopPropagation();
                dispatch(changeTaskStatus({ id: task.id, status: 'In progress' }))
            }
        },
    ]


    return (
        <div className={styles.TodaysTaskWrapper}>
            <SmallTitle text={t('tasks.pendingToday')}/>
            {displayedTasks.length === 0 ? (
                <div className={styles.emptyBox}>
                    <Empty />
                </div>
            ) : (
                <table className={styles.TodayTasksTable}>
                    <colgroup>
                        <col className={styles.colTitle} />
                        <col className={styles.colAction} />
                    </colgroup>
                    <tbody>
                        {displayedTasks.map((task, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className={styles.tableCheckbox}
                                            onClick={(e) => e.stopPropagation()}
                                            checked={task.tick}
                                            onChange={() => dispatch(toggleTask(task.id))}
                                        />
                                        <span className={styles.TaskTitle}>{task.title}</span>
                                    </td>
                                    <td>
                                        <Dropdown
                                            menu={{ items: getTaskStatuses(task) }}
                                            trigger={['click']}
                                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                        >
                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                }}
                                            >
                                                <StatusButton text={task.status} />
                                            </span>
                                        </Dropdown>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}


                    </tbody>

                </table>
            )}

        </div>
    )
}