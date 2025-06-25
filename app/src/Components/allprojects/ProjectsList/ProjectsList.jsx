import React from 'react';
import SmallTitle from '../../SmallTitle/SmallTitle';
import styles from './ProjectsList.module.scss';
import { useSelector } from 'react-redux';
import ProjectsItem from '../ProjectsItem/ProjectsItem';

function ProjectsList({ arr }) {



	return (
		<div className={styles.wrapper}>
			<SmallTitle text='All Projects' />
			<div className={styles.list}>
				{arr.map(item => <ProjectsItem obj={item} key={item.title} />)}
			</div>
		</div>
	);
}

export default ProjectsList;