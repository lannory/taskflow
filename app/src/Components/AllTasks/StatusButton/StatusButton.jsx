import React from 'react';
import styles from './StatusButton.module.scss';

export default function StatusButton({ text, isActive, onClick }) {

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
            {text}
        </button>
    );
}
