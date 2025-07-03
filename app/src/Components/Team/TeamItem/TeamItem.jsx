import React from 'react';
import styles from './TeamItem.module.scss';
import { useTranslation } from 'react-i18next';
import {useSelector} from 'react-redux';

function TeamItem({obj}) {
	const {t} = useTranslation();

	let amount;

	const projects = useSelector(state => state.projects.projectsList);
	const tasks = useSelector(state => state.tasks.tasks);
	
	if(obj.role == 'manager'){
		amount = projects.filter(proj => proj.managerId == obj.id).length;
	} else{
		amount = tasks.filter(task => task.userId == obj.id).length;
	}

	

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
					<p>{amount || 0} {obj.role === 'manager' ? t("team.proj") :t("team.task")}</p>
				</div>
				{/* <p className={styles.rating}>{obj.rating} ({obj.reviews} Reviews)</p> */}
			</div>
		</div>
	);
}

export default TeamItem;

