import React, { useState } from 'react';
import styles from './TasksTable.module.scss';
import { Empty, Dropdown } from "antd";
import StatusButton from '../StatusButton/StatusButton';
import { toggleSort, toggleTask, toggleAllTasks, deleteTask } from '../../../store/Tasks/TasksSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function TasksTable() {
    const dispatch = useDispatch();

    const tasks = useSelector((state) => state.tasks.tasks);
    const sortField = useSelector((state) => state.tasks.sortField);
    const sortDirection = useSelector((state) => state.tasks.sortDirection);
    const activeStatus = useSelector((state) => state.tasks.activeStatus);
    const searchValue = useSelector((state) => state.tasks.searchValue);
    const allTasksTicked = useSelector((state) => state.tasks.allTasksTicked);

    // Обробка кліку по заголовку таблиці для сортування
    const handleSort = (field) => {
        dispatch(toggleSort(field));
    };

    // Створюємо копію tasks
    let displayedTasks = [...tasks];

    if (searchValue) {
        displayedTasks = displayedTasks.filter(task =>
            task.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    // Якщо передано фільтр — фільтруємо таски за статусом
    if (activeStatus) {
        displayedTasks = displayedTasks.filter(task =>
            task.status.toLowerCase() === activeStatus.toLowerCase()
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
    const getTaskOptions = (task) => [
        {
            key: 'edit',
            label: (
                <span className={styles.dropdownItem}>
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                </span>
            ),
            onClick: (e) => {
                e.domEvent.stopPropagation();
            },
        },
        {
            key: 'delete',
            label: (
                <span className={styles.dropdownItem}>
                    <i className="fa-solid fa-trash"></i> Delete
                </span>
            ),
            onClick: (e) => {
                e.domEvent.stopPropagation();
                dispatch(deleteTask(task.id));
            },
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


    return (
        <>
            {displayedTasks.length === 0 ? (
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
                                        checked={allTasksTicked}
                                        onChange={() => dispatch(toggleAllTasks())}
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
                                                checked={task.tick}
                                                onChange={() => dispatch(toggleTask(task.id))}
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
                                            menu={{ items: getTaskOptions(task) }}
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
