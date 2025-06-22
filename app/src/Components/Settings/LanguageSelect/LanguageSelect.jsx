import React from 'react';
import styles from './LanguageSelect.module.scss';

const LanguageSelect = ({ value, onChange }) => {
  return (
    <div className={styles.field}>
      <label>Language</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="default">English (Default)</option>
        <option value="ru">Русский</option>
        <option value="ua">Українська</option>
      </select>
    </div>
  );
};

export default LanguageSelect;