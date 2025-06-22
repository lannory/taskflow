import React, { useState } from 'react';
import styles from './SettingsForm.module.scss';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import ThemSelect from '../ThemSelect/TimezoneSelect';

const SettingsForm = () => {
  const [language, setLanguage] = useState('default');


  return (
    <div className={styles.settingsForm}>
      <div className={styles.tabs}>
        <span className={styles.activeTab}>General</span>
        <span className={styles.tab}>Notification</span>
      </div>

      <LanguageSelect value={language} onChange={setLanguage} />
      <ThemSelect />
    </div>
  );
};

export default SettingsForm;