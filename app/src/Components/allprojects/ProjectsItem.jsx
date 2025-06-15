import React from 'react';
import styles from './Projects.module.scss'
import { LinearProgress } from '@mui/material';

function ProjectsItem({obj}) {
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
					<i className="fa-regular fa-clock" Style='color: #54577A;'></i>
					{obj.deadline} left
				</div>
			</div>
		</div>);
}

export default ProjectsItem;