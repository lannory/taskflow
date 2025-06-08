import React, { useState } from 'react';
import BigButton from '../BigButton/BigButton';
import BigTitle from '../BigTitle/BigTitle';
import styles from './AllTasks.module.css';

export default function AllTasks() {

    const [expandedRows, setExpandedRows] = useState(new Set());
    const [selectedRows, setSelectedRows] = useState(new Set());


    const toggleRow = (index) => {
        const newSet = new Set(expandedRows);
        if (newSet.has(index)) {
            newSet.delete(index);
        } else {
            newSet.add(index);
        }
        setExpandedRows(newSet);
    };

    const toggleSelectAll = () => {
        if (selectedRows.size === tasks.length) {
            setSelectedRows(new Set());
        } else {
            setSelectedRows(new Set(tasks.map((_, i) => i)));
        }
    };

    const toggleSingleRow = (index) => {
        const newSet = new Set(selectedRows);
        if (newSet.has(index)) {
            newSet.delete(index);
        } else {
            newSet.add(index);
        }
        setSelectedRows(newSet);
    };



    const tasks = [
        {
            icon: 'fa-solid fa-bolt',
            title: 'Tech requirements',
            taskCreated: 'Jan 4, 2024',
            duoDate: 'Jan 6, 2024',
            lastActivity: 'Jan 5, 2024',
            description: 'This redesign proposal aims to enhance the user experience, reflect Infoware Technologies commitment to digital innovation'
        },
        {
            icon: 'fa-regular fa-image',
            title: 'UI Design Draft',
            taskCreated: 'Jan 6, 2024',
            duoDate: 'Jan 10, 2024',
            lastActivity: 'Jan 8, 2024',
            description: 'Initial draft of the UI mockups for the dashboard and user profile pages.'
        },
        {
            icon: 'fa-solid fa-film',
            title: 'Backend Integration',
            taskCreated: 'Jan 7, 2024',
            duoDate: 'Jan 14, 2024',
            lastActivity: 'Jan 13, 2024',
            description: 'Connect frontend with the REST API endpoints and test CRUD operations.'
        },
        {
            icon: 'fa-brands fa-figma',
            title: 'Team Feedback Review',
            taskCreated: 'Jan 9, 2024',
            duoDate: 'Jan 11, 2024',
            lastActivity: 'Jan 10, 2024',
            description: 'Gather and address feedback from team members on the current implementation.'
        },
        {
            icon: 'fa-solid fa-bolt',
            title: 'Deployment Setup',
            taskCreated: 'Jan 12, 2024',
            duoDate: 'Jan 15, 2024',
            lastActivity: 'Jan 14, 2024',
            description: 'Configure CI/CD pipelines and prepare production server for deployment.'
        }
    ];

    return (
        <>
            <div className={styles.allTasksTitle}>
                <BigTitle text='All Tasks' />
                <BigButton text='Create Task' style='purple' />
            </div>
            <table className={styles.tasksTable}>
                <colgroup>
                    <col className={styles.colTitle} />
                    <col className={styles.colDate} />
                    <col className={styles.colDate} />
                    <col className={styles.colDate} />
                    <col className={styles.colAction} />
                </colgroup>
                <thead>
                    <tr className={styles.tableHeadRow}>
                        <td>
                            <div className={styles.cellContent}>
                                <input
                                    type="checkbox"
                                    className={styles.tableCheckbox}
                                    checked={selectedRows.size === tasks.length}
                                    onChange={toggleSelectAll}
                                />
                                Task name
                            </div>
                        </td>
                        <td>Task Created</td>
                        <td>Duo Date</td>
                        <td>Last Activity</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <React.Fragment key={index}>
                            <tr className={styles.tableRow}
                                onClick={() => toggleRow(index)}
                                style={expandedRows.size !== 0 && !expandedRows.has(index) ? { backgroundColor: 'transparent' } : {}}>
                                <td>
                                    <div className={styles.cellContent}>
                                        <input
                                            type="checkbox"
                                            className={styles.tableCheckbox}
                                            onClick={(e) => e.stopPropagation()}
                                            checked={selectedRows.has(index)}
                                            onChange={() => toggleSingleRow(index)}
                                        />
                                        <span className={styles.purpleIcon}><i className={task.icon}></i></span>
                                        <span>{task.title}</span>
                                    </div>
                                </td>
                                <td>{task.taskCreated}</td>
                                <td>{task.duoDate}</td>
                                <td>{task.lastActivity}</td>
                                <td><i className="fa-solid fa-ellipsis-vertical" onClick={(e) => e.stopPropagation()}></i></td>
                            </tr>
                            {expandedRows.has(index) && (
                                <tr className={styles.accordionRow}>
                                    <td colSpan={5}>
                                        <p className={styles.accordionContent}>{task.description}</p>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </>
    )
}
