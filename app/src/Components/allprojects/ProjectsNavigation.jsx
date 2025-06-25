import React from 'react';
import { useRef } from 'react';
import styles from './Projects.module.scss';
import { SortAscendingOutlined, SortDescendingOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeShown, changeSort, sorting, setSearchValue} from '../../store/projectsSlice';




function ProjectsNavigation() {


  const dispatch = useDispatch();

  const categories = [
    {
      key: '1',
      value: 'category',
      onClick: () => {
        dispatch(changeShown('category'));
        dispatch(sorting());
      },
      label: (
        <a rel="noopener noreferrer">
          Category
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <button rel="noopener noreferrer">
          List
        </button>
      ),
      onClick: () => {
        dispatch(changeShown('list'));
        dispatch(sorting());
      }
    }
  ];

  const sort = [
    {
      key: '1',
      label: (
        <button rel="noopener noreferrer">
          Deadline
        </button>
      ),
      icon: <SortDescendingOutlined />,
      onClick: () => {
        dispatch(changeSort({type: 'deadline', direction: 'increase'}));
        dispatch(sorting());
      }
    },
    {
      key: '2',
      label: (
        <button rel="noopener noreferrer">
          Deadline
        </button>
      ),
      onClick: () =>{
        dispatch(changeSort({type: 'deadline', direction: 'decrease'}));
        dispatch(sorting());
      },
      icon: <SortAscendingOutlined />,
    },
    {
      key: '3',
      label: (
        <button  rel="noopener noreferrer">
          Progress
        </button>
      ),
      onClick: () =>{
        dispatch(changeSort({type: 'progress', direction: 'increase'}));
        dispatch(sorting());
      },
      icon: <SortDescendingOutlined />,
    },
    {
      key: '4',
      label: (
        <button rel="noopener noreferrer">
          Progress
        </button>
      ),
      onClick: () =>{
        dispatch(changeSort({type: 'progress', direction: 'decrease'}));
        dispatch(sorting());
      },
      icon: <SortAscendingOutlined />,
    }
  ];


  const searchValue = useSelector(state => state.projects.searchValue)


  const shown = useSelector(state => state.projects.shownBy);
  const sortBy = useSelector(state => state.projects.sortType), direction = useSelector(state => state.projects.sortDirection);

  const handleChange = (e) => {
    dispatch(setSearchValue(e.target.value));
  }

	return (
		<nav className={styles.projectsNav}>
			<form action="">
				<input
					type="text"
					className={styles.searchInput}
					placeholder="Search  Project"
          value={searchValue}
          onChange={(e) => handleChange(e)}
				/>
				<button type="button" className={styles.searchBtn}>
					{!searchValue ? <SearchOutlined /> : <i className="fa-solid fa-xmark" onClick={() => dispatch(setSearchValue(''))} />}
				</button>
			</form>

			<div className={styles.navBtns}>
				<div className={styles.categoryMenu}>
          <Dropdown menu={{ items: categories }} trigger={['click']}>
            <button className={`${styles.categoryBtn} ${styles.btn}`}>
              <i className={styles.navIcon + " fa-solid fa-list"}></i>
              Show By : {shown}
					  </button>
          </Dropdown>
				</div>

				<div className="sortMenu">
          <Dropdown menu={{ items: sort }} trigger={['click']}>
            <button className={`${styles.sortBtn} ${styles.btn}`}>
              <i className={styles.navIcon + " fa-regular fa-sort"}></i>
              Sort By : {sortBy || 'default'} {direction  == 'decrease'? <i className="fa-solid fa-arrow-down"></i> : direction == 'increase' ? <i className="fa-solid fa-arrow-up"></i> : ''}
            </button>
          </Dropdown>
        </div>
			</div>
		</nav>
	);
}

export default ProjectsNavigation;