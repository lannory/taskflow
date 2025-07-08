import React from 'react';
import { Select, Avatar } from 'antd';
import styles from './SelectTaskDeveloper.module.scss';

const { Option } = Select;

export default function SelectTaskDeveloper({ users, value, onChange }) {
  const developers = users.filter(user => user.role === 'developer');

  return (
    <div className={styles.wrapper}>
    <Select
        value={value || undefined}
        placeholder="Select Developer"
        onChange={onChange}
        classNames={{
            popup: {
                root: styles.dropdown,
            },
        }}
      >
        {developers.map(user => (
          <Option key={user.id} value={user.id}>
            <div className={styles.option}>
              <Avatar src={`team/${user.img}.png`} size="small" />
              <span className={styles.name}>{user.name}</span>
            </div>
          </Option>
        ))}
    </Select>
    </div>
  );
}