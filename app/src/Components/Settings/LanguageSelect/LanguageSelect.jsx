import React from 'react';
import styles from './LanguageSelect.module.scss';
import { useTranslation } from 'react-i18next';


const LanguageSelect = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.field}>
      <label>{t('settings.language')}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="en">English (Default)</option>
        <option value="ua">Українська</option>
      </select>
    </div>
  );
};

export default LanguageSelect;