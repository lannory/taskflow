import React from 'react';
import styles from './TeamItem.module.scss';


function TeamItem({obj}) {
	return (
		<div className={styles.card} >
			<div className={styles.person}>
				<img src={`/team/${obj.img}.png`} alt="" />
				<div>
					<h3 className={styles.name}>{obj.name}</h3>
					<p className={styles.job}>{obj.job}</p>
				</div>
			</div>
			<p className={styles.text}>{obj.desc}</p>
			<div className={styles.desc}>
				<div className={styles.task}>
					<i className={styles.icon + " fa-regular fa-note-sticky"}></i>
					<p>{obj.taskCount} Task</p>
				</div>
				{/* <p className={styles.rating}>{obj.rating} ({obj.reviews} Reviews)</p> */}
			</div>
		</div>
	);
}

export default TeamItem;

