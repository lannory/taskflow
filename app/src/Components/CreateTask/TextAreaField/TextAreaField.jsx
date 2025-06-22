import React from 'react';
import styles from './TextAreaField.module.scss';

const TextAreaField = ({ value, onChange, placeholder }) => (
  <div className={styles.wrapperTextArea}>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className={styles.textArea}
    />
  </div>
);

export default TextAreaField;
