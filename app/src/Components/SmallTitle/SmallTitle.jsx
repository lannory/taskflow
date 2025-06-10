import styles from './SmallTitle.module.css';

export default function SmallTitle({text}){
    return(
        <h2 className={styles.smallTitle}>{text}</h2>
    )
}