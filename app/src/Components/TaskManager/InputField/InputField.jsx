import React from 'react';
import styles from './InputField.module.scss';

const InputField = ({ label, value, onChange, placeholder }) => (
  <div className={styles.inputContainer}>
    <label className={styles.LabelField}>{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.inputField}
    />
  </div>
);

export default InputField;
