import styles from './BigTitle.module.css';

export default function BigTitle({text}){
    return(
        <h1 className={styles.bigTitle}>{text}</h1>
    )
}