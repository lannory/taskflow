import React from 'react';
import styles from './StatusButton.module.scss';
import { useTranslation } from 'react-i18next';

export default function StatusButton({ text, isActive, onClick }) {


    const {t} = useTranslation();

    let type = '';

    switch (text) {
        case 'Approved':
            type = 'green';
            break;
        case 'Re work':
            type = 'red';
            break;
        case 'Pending':
            type = 'yellow';
            break;
        default:
            type = '';
    }

    const classes = [
        styles.statusButton,
        styles[type],
        isActive ? styles.active : ''
    ].join(' ');

    return (
        <button className={classes} type="button" onClick={onClick}>
            {t(`tasks.status.${text}`)}
        </button>
    );
}
