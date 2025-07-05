import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../../../store/projects/projectsSlice';
import { setSelectedProject } from '../../../store/Tasks/TasksSlice';
import styles from './ProjectSelect.module.scss';
import { Select, Spin } from 'antd';

const { Option } = Select;

export default function ProjectSelect({
  value,
  onChange,
  placeholder = 'Select Project',
}) {
  const dispatch = useDispatch();
  const { projectsList, loading, error } = useSelector(state => state.projects);

  useEffect(() => {
    if (!projectsList.length) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projectsList.length]);

  const handleChange = (projectId) => {
    onChange?.(projectId);
    dispatch(setSelectedProject(projectId));
  };

  return (
    <div className={styles.wrapper}>
      <Select
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        loading={loading}
        className={styles.select}
        allowClear
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {projectsList.map(project => (
          <Option key={project.id} value={project.title}>
            {project.title}
          </Option>
        ))}
      </Select>
      {loading && <Spin className={styles.spinner} />}
      {error && <div className={styles.error}>Ошибка: {error}</div>}
    </div>
  );
}