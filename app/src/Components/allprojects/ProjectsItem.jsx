import React from 'react';
import styles from './Projects.module.scss'
import { LinearProgress } from '@mui/material';
import { Dropdown, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../store/projectsSlice';



function ProjectsItem({obj}) {

	const dispatch = useDispatch();

	const dropdownMenu = [
		{
		  key: '1',
		  onClick: () => {
			dispatch(deleteProject(obj.id));
		  },
		  label: (
			<a rel="noopener noreferrer">
			  Delete
			</a>
		  ),
		},
		{
		  key: '2',
		  label: (
			<button rel="noopener noreferrer">
			  Edit
			</button>
		  ),
		  onClick: () => {
			
		  }
		}
	  ];


	return (
		<div className={styles.project}>
			<img src={`/projects/${obj.img}.png`} alt="" className={styles.projectBanner} />

			<div className={styles.projectDesc}>
				<h3 className={styles.projectTitle}>{obj.title}</h3>
				<p className={styles.projectSubtitle}>{obj.subtitle}</p>
			</div>

			<div className={styles.projectProgress}>
				<div className={styles.progressDesc}>
					<p className={styles.progressText}>Progress</p>
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
					<i className={styles.icon + " fa-regular fa-clock"}></i>
					{obj.deadlineAmount} {obj.deadlineUnit} left
				</div>
			</div>
			
			<div className={styles.dropdown}>
				<Dropdown menu={{ items: dropdownMenu }} trigger={['click']}>
					<button>
						<i className={styles.icon + " fa-regular fa-ellipsis-vertical"}></i>
					</button>
				</Dropdown>
			</div>
		</div>);
}

export default ProjectsItem;