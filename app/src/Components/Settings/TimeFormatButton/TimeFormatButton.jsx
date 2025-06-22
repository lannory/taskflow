import React from 'react';
import styles from './TimeFormatButton.module.scss';

const TimeFormatButton = ({ label, active, onClick }) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.circle}></span>
    </button>
  );
};

export default TimeFormatButton;
