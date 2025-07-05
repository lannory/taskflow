import React from 'react';
import styles from './ProjectsNavigation.module.scss';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeShown, changeSort, sorting, setSearchValue} from '../../../store/projects/projectsSlice';
import { useNavigate } from 'react-router-dom';
import BigButton from '../../BigButton/BigButton';

import { useTranslation } from 'react-i18next';

function ProjectsNavigation() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = [
    {
      key: '1',
      value: 'category',
      onClick: () => {
        dispatch(changeShown('category'));
        dispatch(sorting());
      },
      label: <a>{t('projects.view.category')}</a>,
    },
    {
      key: '2',
      label: <button>{t('projects.view.list')}</button>,
      onClick: () => {
        dispatch(changeShown('list'));
        dispatch(sorting());
      }
    }
  ];

  const sort = [
    {
      key: '1',
      label: <button>{t('projects.sort.deadline')}</button>,
      icon: <SortDescendingOutlined />,
      onClick: () => {
        dispatch(changeSort({ type: 'deadline', direction: 'increase' }));
        dispatch(sorting());
      }
    },
    {
      key: '2',
      label: <button>{t('projects.sort.deadline')}</button>,
      icon: <SortAscendingOutlined />,
      onClick: () => {
        dispatch(changeSort({ type: 'deadline', direction: 'decrease' }));
        dispatch(sorting());
      }
    },
    {
      key: '3',
      label: <button>{t('projects.sort.progress')}</button>,
      icon: <SortDescendingOutlined />,
      onClick: () => {
        dispatch(changeSort({ type: 'progress', direction: 'increase' }));
        dispatch(sorting());
      }
    },
    {
      key: '4',
      label: <button>{t('projects.sort.progress')}</button>,
      icon: <SortAscendingOutlined />,
      onClick: () => {
        dispatch(changeSort({ type: 'progress', direction: 'decrease' }));
        dispatch(sorting());
      }
    }
  ];

  const searchValue = useSelector(state => state.projects.searchValue);
  const shown = useSelector(state => state.projects.shownBy);
  const sortBy = useSelector(state => state.projects.sortType);
  const direction = useSelector(state => state.projects.sortDirection);

  const handleChange = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  return (
    <nav className={styles.projectsNav}>
      <div>
        <BigButton
          text={t('projects.actions.new')}
          style="purple"
          onClick={() => navigate('/createproject')}
        />
      </div>
      <form>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={t('projects.actions.search')}
          value={searchValue}
          onChange={handleChange}
        />
        <button type="button" className={styles.searchBtn}>
          {searchValue ? (
            <i
              onClick={() => dispatch(setSearchValue(''))}
              className="fa-solid fa-xmark"
            ></i>
          ) : (
            <i className={`${styles.navIcon} fa-solid fa-magnifying-glass`}></i>
          )}
        </button>
      </form>
      <div className={styles.navBtns}>
        <div className={styles.categoryMenu}>
          <Dropdown menu={{ items: categories }} trigger={['click']}>
            <button className={`${styles.categoryBtn} ${styles.btn}`}>
              <i className={`${styles.navIcon} fa-solid fa-list`}></i>
              {t('projects.view.showBy')} : {t(`projects.view.${shown}`)}
            </button>
          </Dropdown>
        </div>

        <div className={styles.sortMenu}>
          <Dropdown menu={{ items: sort }} trigger={['click']}>
            <button className={`${styles.sortBtn} ${styles.btn}`}>
              <i className={`${styles.navIcon} fa-solid fa-sort`}></i>
              {t('projects.sort.sortBy')} : {sortBy ? t(`projects.sort.${sortBy}`) : t('projects.sort.default')} {' '}
              {direction === 'decrease' ? (
                <i className="fa-solid fa-arrow-down"></i>
              ) : direction === 'increase' ? (
                <i className="fa-solid fa-arrow-up"></i>
              ) : null}
            </button>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}

export default ProjectsNavigation;