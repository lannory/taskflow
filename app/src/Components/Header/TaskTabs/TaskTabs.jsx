import { useState } from 'react';
import styles from './TaskTabs.module.scss';
import React from "react"

export default function TaskTabs() {
  const [activeTab, setActiveTab] = useState('');

  const tabs = ['All', 'Approved', 'Pending', 'Completed'];

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
