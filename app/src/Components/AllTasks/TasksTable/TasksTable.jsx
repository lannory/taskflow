import React, { useState } from 'react';
import styles from './TasksTable.module.scss';
import { Empty, Dropdown, Space } from "antd";

export default function TasksTable({ tasks }) {

    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);

    const handleSort = (field) => {
        if (sortField !== field) {
            setSortField(field);
            setSortDirection('asc');
        } else if (sortDirection === 'asc') {
            setSortDirection('desc');
        } else if (sortDirection === 'desc') {
            setSortField(null);
            setSortDirection(null);
        }
    };

    let displayedTasks = [...tasks];

    if (sortField && sortDirection) {
        displayedTasks.sort((a, b) => {
            const dateA = new Date(a[sortField]);
            const dateB = new Date(b[sortField]);

            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        });
    }

    function formatDate(dateStr) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', options);
    }


    const options = [
        {
            key: 'edit',
            label: <span className={styles.dropdownItem}><i className="fa-solid fa-pen-to-square"></i>Edit</span>,
        },
        {
            key: 'delete',
            label: <span className={styles.dropdownItem}><i className="fa-solid fa-trash"></i>Delete</span>,
        },
    ];

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
        <>
            {tasks.length === 0 ? (
                <Empty />
            ) : (
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
                            <td
                                onClick={() => handleSort('taskCreated')}
                                className={styles.sortColumn}
                            >
                                Task Created
                                {sortField === 'taskCreated' && (
                                    <span>
                                        {sortDirection === 'asc' ? (
                                            <i className="fa-solid fa-arrow-up"></i>
                                        ) : (
                                            <i className="fa-solid fa-arrow-down"></i>
                                        )}
                                    </span>
                                )}
                            </td>
                            <td
                                onClick={() => handleSort('duoDate')}
                                className={styles.sortColumn}
                            >
                                Duo Date
                                {sortField === 'duoDate' && (
                                    <span>
                                        {sortDirection === 'asc' ? (
                                            <i className="fa-solid fa-arrow-up"></i>
                                        ) : (
                                            <i className="fa-solid fa-arrow-down"></i>
                                        )}
                                    </span>
                                )}
                            </td>
                            <td>Last Activity</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedTasks.map((task, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    className={styles.tableRow}
                                    onClick={() => toggleRow(index)}
                                    style={
                                        expandedRows.size !== 0 && !expandedRows.has(index)
                                            ? { backgroundColor: 'transparent' }
                                            : {}
                                    }
                                >
                                    <td>
                                        <div className={styles.cellContent}>
                                            <input
                                                type="checkbox"
                                                className={styles.tableCheckbox}
                                                onClick={(e) => e.stopPropagation()}
                                                checked={selectedRows.has(index)}
                                                onChange={() => toggleSingleRow(index)}
                                            />
                                            <span className={styles.purpleIcon}>
                                                <i className={task.icon}></i>
                                            </span>
                                            <span>{task.title}</span>
                                        </div>
                                    </td>
                                    <td>{formatDate(task.taskCreated)}</td>
                                    <td>{formatDate(task.duoDate)}</td>
                                    <td>{formatDate(task.lastActivity)}</td>
                                    <td>

                                        <Dropdown menu={{ items: options }} trigger={['click']}>
                                            <i
                                                className="fa-solid fa-ellipsis-vertical"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                }}
                                            ></i>
                                        </Dropdown>
                                    </td>
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
            )}
        </>
    );

}