import React, {  } from 'react';
import styles from './TasksTable.module.scss';
import { Empty, Dropdown } from "antd";
import StatusButton from '../StatusButton/StatusButton';
import { toggleSort, toggleTask, toggleAllTasks, deleteTask, changeTaskStatus, setExtendetRow, filterTasks } from '../../../store/Tasks/TasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import BigButton from '../../BigButton/BigButton';
import { useNavigate } from 'react-router-dom';



export default function TasksTable({tasks, isProjectsTasks = false}) {
    const dispatch = useDispatch();

    const sortField = useSelector((state) => state.tasks.sortField);
    const sortDirection = useSelector((state) => state.tasks.sortDirection);
    const activeStatus = useSelector((state) => state.tasks.activeStatus);
    const searchValue = useSelector((state) => state.tasks.searchValue);
    const allTasksTicked = useSelector((state) => state.tasks.allTasksTicked);
    const expandedRows = useSelector((state) => state.tasks.expandedRows);
    const searchDate = useSelector((state) => state.tasks.searchDate);
    const projects = useSelector(state => state.projects.projectsList);


  // Обробка кліку по заголовку таблиці для сортування
  const handleSort = (field) => {
    dispatch(toggleSort(field));
  };

    // Створюємо копію tasks
    let displayedTasks = [...tasks];
    
    if(!isProjectsTasks){
        displayedTasks = displayedTasks.map(task => {
            const taskId = task.projectId;
            const project = projects.find(proj => proj.id == taskId );
            
            const projectName = project.title;
            const newTask = {...task, projectName};
            return newTask;
        })
    }


  if (searchValue) {
    displayedTasks = displayedTasks.filter(task =>
      task.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  // Якщо передано фільтр — фільтруємо таски за статусом
  if (activeStatus === 'Completed') {
    displayedTasks = displayedTasks.filter(task => task.tick === true);
  } else if (activeStatus) {
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

    if (searchDate) {
        displayedTasks = displayedTasks.filter(task =>
            task.duoDate === searchDate
        )
    };

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

    const handleShowAll = () =>{
        dispatch(filterTasks());
        displayedTasks = [...tasks];
    }


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
                            {isProjectsTasks ? '' : <td>Project</td>}
                            <td>Status</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedTasks.map((task, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    className={styles.tableRow}
                                    onClick={() => dispatch(setExtendetRow(task.id))}
                                    style={
                                        expandedRows.length !== 0 && !expandedRows.includes(task.id)
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
                                            <span>{task.title}</span>
                                        </div>
                                    </td>
                                    <td>{formatDate(task.taskCreated)}</td>
                                    <td>{formatDate(task.duoDate)}</td>
                                    {isProjectsTasks ? '' : <td>{task.projectName}</td>}
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
                                {expandedRows.includes(task.id) && (
                                    <tr className={styles.accordionRow}>
                                        <td colSpan={6}>
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
