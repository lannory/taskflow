import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../../store/Users/usersSlice';
import { Select, Avatar } from 'antd';
import styles from './UserSelect.module.scss';

const { Option } = Select;

export default function UserSelect({ value, onChange, placeholder = "Select Project User" }) {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.users);

  useEffect(() => {
    if (!users.length) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  // Фильтруем только разработчиков
  const developers = users.filter(user => user.role === 'developer');

  return (
    <div className={styles.wrapper}>
      <Select
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={styles.select}
        optionLabelProp="label"
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {developers.map(user => (
          <Option key={user.name} value={user.name} label={user.name}>
            <div className={styles.option}>
              <Avatar src={`/team/${user.img}.png`} size="small" />
              <span className={styles.name}>{user.name}</span>
            </div>
          </Option>
        ))}
      </Select>
    </div>
  );
}
