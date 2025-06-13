import React from 'react';
import styles from './TextAreaField.module.scss';

const TextAreaField = ({ value, onChange, placeholder }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={4}
    className={styles.textAreaField}
  />
);

export default TextAreaField;
