import React from 'react';
import styles from './StatusButton.module.scss';

export default function StatusButton({ text, type, isActive, onClick }) {
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
