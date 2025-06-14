import styles from './SmallTitle.module.scss';
import React from "react"


export default function SmallTitle({text}){
    return(
        <h2 className={styles.smallTitle}>{text}</h2>
    )
}