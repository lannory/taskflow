import React, { useState } from 'react';
import styles from './TasksTable.module.scss';

export default function TasksTable({ tasks }) {


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

    return (
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
    )
}