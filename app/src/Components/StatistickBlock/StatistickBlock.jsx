import React, { use, useEffect } from 'react';
import styles from './StatistickBlock.module.scss';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function StatistickBlock({ type }) {

    const {t} = useTranslation()

    const tasks = useSelector(state => state.tasks.tasks);

    let number = 0;

    if(tasks.length === 0) {
        return
    }
    switch (type) {
        case 'total_tasks':
            number = tasks.filter(task => task.tick === true).length;
    }

    return (
        <div className={styles.StatisticWrapper}>
            <h3 className={styles.StatisticTitle}>{t("statisticTotal")}</h3>
            <div className={styles.StatisticContent}>
                <p className={styles.StatisticNumber}>{number}</p>
                <span className={styles.StatisticIcon}><i className="fa-solid fa-clock-rotate-left"></i></span>
            </div>
        </div>
    )
}