import React from 'react';
import styles from './ThemSelect.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import useSelection from 'antd/es/table/hooks/useSelection';
import { setTheme } from '../../../store/Settings/settingsSlice';

const ThemSelect = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.settings.theme)

  const handleChange = (event) => {
    dispatch(setTheme(event.target.value))
  }

  return (
    <div className={styles.field}>
      <label>Them</label>
      <select value={theme} onChange={handleChange}>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
};

export default ThemSelect;