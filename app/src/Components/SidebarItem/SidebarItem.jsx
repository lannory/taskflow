import styles from "./SidebarItem.module.css";

export default function SidebarItem({ icon, label, active, onClick }) {
    return (
        <div className={`${styles.menuItem} ${active ? styles.active : ""}`} onClick={onClick}>
            <i className={`${icon} ${styles.icon}`}></i>
            <span className={styles.label}>{label}</span>
        </div>
    );
};
