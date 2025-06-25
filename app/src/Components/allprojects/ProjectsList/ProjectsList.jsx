import React from 'react';
import SmallTitle from '../../SmallTitle/SmallTitle';
import styles from './ProjectsList.module.scss';
import { useSelector } from 'react-redux';
<<<<<<< HEAD:app/src/Components/allprojects/ProjectsList.jsx
import ProjectsItem from './ProjectsItem';
import { Empty } from 'antd';

=======
import ProjectsItem from '../ProjectsItem/ProjectsItem';

function ProjectsList({ arr }) {
>>>>>>> origin/main:app/src/Components/allprojects/ProjectsList/ProjectsList.jsx



	return (
		<div className={styles.wrapper}>
			<SmallTitle text='All Projects' />
			<div className={styles.list}>
<<<<<<< HEAD:app/src/Components/allprojects/ProjectsList.jsx
				{arr.length == 0 ? <Empty/> :arr.map(item => <ProjectsItem obj={item} key={item.title}/>)}
=======
				{arr.map(item => <ProjectsItem obj={item} key={item.title} />)}
>>>>>>> origin/main:app/src/Components/allprojects/ProjectsList/ProjectsList.jsx
			</div>
		</div>
	);
}

export default ProjectsList;