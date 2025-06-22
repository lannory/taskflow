import React from 'react';
import styles from './ThemSelect.module.scss';

const ThemSelect = () => {
  return (
    <div className={styles.field}>
      <label>Them</label>
      <select >
        <option value="default">Them</option>
        <option value="Dark">Dark</option>
        <option value="Light">Light</option>
      </select>
    </div>
  );
};

export default ThemSelect;