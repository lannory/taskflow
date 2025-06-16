import React from 'react';
import styles from './TasksSearch.module.scss';

export default function TasksSearch() {

    return (
        <>
            <div className={styles.inputContainer}>
                <input className={styles.TasksSearchInput} type="text" placeholder="Search Task" name='TasksSearch'/>
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </>
    )
}
