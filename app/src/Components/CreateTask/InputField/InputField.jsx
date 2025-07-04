import React from 'react';
import styles from './InputField.module.scss';

const InputField = ({ name, value, onChange, onBlur, placeholder }) => (
  <div className={styles.inputContainer}>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={styles.inputField}
    />
  </div>
);

export default InputField;