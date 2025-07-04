import React from 'react';
import styles from './TextAreaField.module.scss';

const TextAreaField = ({ name, value, onChange, onBlur, placeholder }) => (
  <div className={styles.wrapperTextArea}>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      rows={4}
      className={styles.textArea}
    />
  </div>
);

export default TextAreaField;