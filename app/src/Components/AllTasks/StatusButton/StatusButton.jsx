import React from 'react';
import styles from './StatusButton.module.scss';

export default function StatusButton({text, type}){

    return(
        <button className={[styles.statusButton, styles[type]].join(' ')} type="button">{text}</button>
    )
}