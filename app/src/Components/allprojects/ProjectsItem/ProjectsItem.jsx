import React from 'react';
import styles from './Projects.module.scss';
import { LinearProgress } from '@mui/material';
import { Dropdown } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../../store/projects/projectsSlice';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ProjectsItem({ obj }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const dropdownMenu = [
    {
      key: '1',
      onClick: () => {
        dispatch(deleteProject(obj.id));
      },
      label: <a>{t('actions.delete')}</a>,
    },
    {
      key: '2',
      onClick: () => {
      },
      label: <button>{t('actions.edit')}</button>,
    }
  ];

  return (
    <div className={styles.wrapper}>
		<Link to={`/allprojects/${obj.id}`}>
		  <div className={styles.project}>
			<img
			  src={`/projects/${obj.img}.png`}
			  alt=""
			  className={styles.projectBanner}
			/>
			<div className={styles.projectDesc}>
			  <h3 className={styles.projectTitle}>{obj.title}</h3>
			  <p className={styles.projectSubtitle}>{obj.subtitle}</p>
			</div>
			<div className={styles.projectProgress}>
				<div className={styles.progressDesc}>
					<p className={styles.progressText}>{t('projects.labels.progress')}</p>
					<p className={styles.progress}>{obj.progress}%</p>
				</div>
				<LinearProgress
					variant="determinate"
					value={obj.progress}
					sx={{
						'.MuiLinearProgress-bar': {
						backgroundColor: '#546FFF',
						},
					}}
				/>
			</div>
				<div className={styles.projectDeadline}>
					<div className={styles.deadline}>
						<i className={`${styles.icon} fa-regular fa-clock`}></i>
						{obj.deadlineAmount} {t(`projects.deadline.${obj.deadlineUnit}`)} {t('projects.deadline.left')}
					</div>
				</div>
		  </div>
		</Link>
		<div className={styles.dropdown}>
			<Dropdown menu={{ items: dropdownMenu }} trigger={['click']}>
				<button>
				<i className={`${styles.icon} fa-solid fa-ellipsis-vertical`}></i>
				</button>
			</Dropdown>
		</div>
	</div>
  );
}

export default ProjectsItem;
