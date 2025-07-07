import React from 'react';
import styles from './TasksSearch.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../../store/Tasks/TasksSlice';
import { useTranslation } from 'react-i18next';

export default function TasksSearch() {

    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.tasks.searchValue)


    const { t }= useTranslation();

    return (
        <div className={styles.inputContainer}>
            <input
                className={styles.TasksSearchInput}
                type="text"
                placeholder={t("tasks.search")}
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
