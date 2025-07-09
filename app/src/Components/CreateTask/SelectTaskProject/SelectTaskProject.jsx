import React from 'react';
import { Select, Avatar } from 'antd';
import styles from './SelectTaskProject.module.scss';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

export default function SelectTaskProject({ value, onChange }) {
  const projects = useSelector(state => state.projects.projectsList);

  const {t} = useTranslation();

  return (
    <div className={styles.wrapper}>
    <Select
        value={value || undefined}
        placeholder={t("tasks.form.projectPlaceholder")}
        onChange={onChange}
        classNames={{
            popup: {
                root: styles.dropdown,
            },
        }}
      >
        {projects.map(project => (
          <Option key={project.id} value={project.id}>
            <div className={styles.option}>
              <Avatar src={`projects/${project.img}.png`} size="small" />
              <span className={styles.name}>{project.title}</span>
            </div>
          </Option>
        ))}
    </Select>
    </div>
  );
}