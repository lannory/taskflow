import React from 'react';
import styles from './TimezoneSelect.module.scss';

const TimezoneSelect = ({ value, onChange }) => {
  return (
    <div className={styles.field}>
      <label>Timezone</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="default">English (Default)</option>
        <option value="utc+2">UTC +2</option>
        <option value="utc+3">UTC +3</option>
      </select>
    </div>
  );
};

export default TimezoneSelect;