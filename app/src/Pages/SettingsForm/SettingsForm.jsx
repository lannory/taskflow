import React, { useState } from 'react';
import styles from './SettingsForm.module.scss';
import LanguageSelect from '../../Components/Settings/LanguageSelect/LanguageSelect';
import ThemSelect from '../../Components/Settings/ThemSelect/ThemSelect';

const SettingsForm = () => {
  const [language, setLanguage] = useState('default');


  return (
    <div className={styles.settingsForm}>
      <LanguageSelect value={language} onChange={setLanguage} />
      <ThemSelect />
    </div>
  );
};

export default SettingsForm;