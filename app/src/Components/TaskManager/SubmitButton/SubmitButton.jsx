import React from 'react';
import styles from './SubmitButton.module.scss';

const SubmitButton = ({ text }) => (
  <button
    type="submit"
    className={styles.submitButton}
  >
    {text}
  </button>
);

export default SubmitButton;
