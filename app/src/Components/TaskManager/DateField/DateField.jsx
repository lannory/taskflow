import React from 'react';
import styles from './DateField.module.scss';

const DateField = ({ value, onChange, placeholder, label }) => (
  <div
    className={styles.DateFieldContainer}>
    <label
      className={styles.LabelField}>{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.DateField}
    />
  </div>
);

export default DateField;
