import React from 'react';
import styles from './TasksSearch.module.scss';

export default function TasksSearch({value, setValue}) {

    return (
        <div className={styles.inputContainer}>
            <input
                className={styles.TasksSearchInput}
                type="text"
                placeholder="Search Task"
                name="TasksSearch"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {value
                ? <i className="fa-solid fa-xmark" onClick={() => setValue('')} />
                : <i className="fa-solid fa-magnifying-glass" />}
        </div>
    );
}
