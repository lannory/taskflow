import styles from './BigTitle.module.scss';
import React from "react"

export default function BigTitle({text}){
    return(
        <h1 className={styles.bigTitle}>{text}</h1>
    )
}