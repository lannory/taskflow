import React from 'react';
import ProjectsNavigation from '../../Components/allprojects/ProjectsNavigation/ProjectsNavigation';
import styles from './AllProjects.module.scss'
import ProjectsSlider from '../../Components/allprojects/ProjectsSlider/ProjectsSlider';
import { useSelector } from 'react-redux';
import ProjectsList from '../../Components/allprojects/ProjectsList/ProjectsList';

function AllProjects() {

	const projects = useSelector(state => state.projects.projects);

	const shownBy = useSelector(state => state.projects.shownBy);

	return (
		<div className={styles.container}>
			<ProjectsNavigation />
			{shownBy == 'category' ?
				<><ProjectsSlider title={'New Project'} projects={projects.newProj} />
					<ProjectsSlider title={'Time limit'} projects={projects.timeLim} /></> : <ProjectsList arr={projects} />}

		</div>
	);
}

export default AllProjects;