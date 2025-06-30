import React from 'react';
import { Select, Avatar } from 'antd';
import styles from './SelectProjectManager.module.scss';

const { Option } = Select;

export default function SelectProjectManager({ users, value, onChange }) {
  const managers = users.filter(user => user.role === 'manager');

  return (
    <div className={styles.wrapper}>
    <Select
        // value={value}
        placeholder="Select Project Manager"
        onChange={onChange}
        classNames={{
            popup: {
                root: styles.dropdown,
            },
        }}
      >
        {managers.map(user => (
          <Option key={user.id} value={user.id}>
            <div className={styles.option}>
              <Avatar src={user.avatar} size="small" />
              <span className={styles.name}>{user.name}</span>
            </div>
          </Option>
        ))}
    </Select>
    </div>
  );
}
