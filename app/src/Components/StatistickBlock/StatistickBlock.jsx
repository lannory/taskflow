import React, { use, useEffect } from 'react';
import styles from './StatistickBlock.module.scss';
import { useSelector } from 'react-redux';

export default function StatistickBlock({ type }) {

    const tasks = useSelector(state => state.tasks.tasks);

    let number = 0;

    switch (type) {
        case 'total_tasks':
            number = tasks.filter(task => task.tick === true).length;
    }

    return (
        <div className={styles.StatisticWrapper}>
            <h3 className={styles.StatisticTitle}>Total tasks Completed</h3>
            <div className={styles.StatisticContent}>
                <p className={styles.StatisticNumber}>{number}</p>
                <span className={styles.StatisticIcon}><i className="fa-solid fa-clock-rotate-left"></i></span>
            </div>
        </div>
    )
}