import { useState } from 'react';
import styles from './TaskTabs.module.css';

export default function TaskTabs() {
  const [activeTab, setActiveTab] = useState('');

  const tabs = ['Approved', 'Pending', 'Completed', 'Assigned Task’s'];

  return (
    <div className={styles.taskTabs}>
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`${styles.taskTabsBtn} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
