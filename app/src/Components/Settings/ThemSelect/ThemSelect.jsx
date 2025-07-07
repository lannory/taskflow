import React from 'react';
import styles from './ThemSelect.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import useSelection from 'antd/es/table/hooks/useSelection';
import { setTheme } from '../../../store/Settings/settingsSlice';
import { useTranslation } from 'react-i18next';

const ThemSelect = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.settings.theme)
  const { t } = useTranslation();

  const handleChange = (event) => {
    dispatch(setTheme(event.target.value))
  }

  return (
    <div className={styles.field}>
      <label>{t('settings.themeLabel')}</label>
      <select value={theme} onChange={handleChange}>
        <option value="dark">{t('settings.dark')}</option>
        <option value="light">{t('settings.light')}</option>
      </select>
    </div>
  );
};

export default ThemSelect;