import React, { useState } from 'react';
import styles from './SettingsForm.module.scss';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import TimezoneSelect from '../TimezoneSelect/TimezoneSelect';
import TimeFormatToggle from '../TimeFormatToggle/TimeFormatToggle';

const SettingsForm = () => {
  const [language, setLanguage] = useState('default');
  const [timezone, setTimezone] = useState('default');
  const [timeFormat, setTimeFormat] = useState('24h');


  return (
    <div className={styles.settingsForm}>
      <div className={styles.tabs}>
        <span className={styles.activeTab}>General</span>
        <span className={styles.tab}>Notification</span>
      </div>

      <LanguageSelect value={language} onChange={setLanguage} />
      <TimezoneSelect value={timezone} onChange={setTimezone} />
      <TimeFormatToggle value={timeFormat} onChange={setTimeFormat} />
    </div>
  );
};

export default SettingsForm;