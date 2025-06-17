import React, { useState } from 'react';
import styles from './TasksTable.module.scss';
import { Empty, Dropdown, Space } from "antd";
import StatusButton from '../StatusButton/StatusButton';

export default function TasksTable({ tasks, show }) {
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);

    // Обробка кліку по заголовку таблиці для сортування
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

    // Створюємо копію tasks
    let displayedTasks = [...tasks];

    // Якщо передано фільтр show — фільтруємо таски за статусом
    if (show) {
        displayedTasks = displayedTasks.filter(task =>
            task.status.toLowerCase() === show.toLowerCase()
        );
    }

    // Якщо вибрано поле сортування — сортуємо масив displayedTasks
    if (sortField && sortDirection) {
        displayedTasks.sort((a, b) => {
            const dateA = new Date(a[sortField]);
            const dateB = new Date(b[sortField]);

            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        });
    }

    // Форматування дати
    function formatDate(dateStr) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', options);
    }

    // Опції для випадаючого меню в колонці Action
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

    // Опції для статуів завдання
    const taskStatuses = [
        { key: 'Approved', label: <StatusButton text='Approved' />, },
        { key: 'Re work', label: <StatusButton text='Re work' />, },
        { key: 'Pending', label: <StatusButton text='Pending' />, },
        { key: 'In progress', label: <StatusButton text='In progress' />, },
    ]

    const [expandedRows, setExpandedRows] = useState(new Set()); // Зберігає індекси відкритих рядків
    const [selectedRows, setSelectedRows] = useState(new Set()); // Зберігає індекси вибраних рядків

    // Розгортає або згортає окремий рядок таблиці
    const toggleRow = (index) => {
        const newSet = new Set(expandedRows);
        if (newSet.has(index)) {
            newSet.delete(index);
        } else {
            newSet.add(index);
        }
        setExpandedRows(newSet);
    };

    // Вибрати або зняти вибір з усіх рядків
    const toggleSelectAll = () => {
        if (selectedRows.size === tasks.length) {
            setSelectedRows(new Set()); // Зняти всі
        } else {
            setSelectedRows(new Set(tasks.map((_, i) => i))); // Вибрати всі
        }
    };

    // Вибрати або зняти вибір з окремого рядка
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
                            <td onClick={() => handleSort('taskCreated')} className={styles.sortColumn}>
                                Task Created
                                {sortField === 'taskCreated' && (
                                    <span>
                                        {sortDirection === 'asc'
                                            ? <i className="fa-solid fa-arrow-up"></i>
                                            : <i className="fa-solid fa-arrow-down"></i>
                                        }
                                    </span>
                                )}
                            </td>
                            <td onClick={() => handleSort('duoDate')} className={styles.sortColumn}>
                                Duo Date
                                {sortField === 'duoDate' && (
                                    <span>
                                        {sortDirection === 'asc'
                                            ? <i className="fa-solid fa-arrow-up"></i>
                                            : <i className="fa-solid fa-arrow-down"></i>
                                        }
                                    </span>
                                )}
                            </td>
                            <td>Status</td>
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
                                    <td>
                                        <Dropdown
                                            menu={{ items: taskStatuses }}
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
                                    <td>
                                        <Dropdown
                                            menu={{ items: options }}
                                            trigger={['click']}
                                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                        >
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
