import React from 'react';
import styles from './TasksSearch.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../../store/Tasks/TasksSlice';

export default function TasksSearch() {

    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.tasks.searchValue)

    return (
        <div className={styles.inputContainer}>
            <input
                className={styles.TasksSearchInput}
                type="text"
                placeholder="Search Task"
                name="TasksSearch"
                value={searchValue}
                onChange={e => dispatch(setSearchValue(e.target.value))}
            />
            {searchValue
                ? <i className="fa-solid fa-xmark" onClick={() => dispatch(setSearchValue(''))} />
                : <i className="fa-solid fa-magnifying-glass" />}
        </div>
    );
}
