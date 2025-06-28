import React from 'react';

import ProjectsNavigation from '../../Components/allprojects/ProjectsNavigation/ProjectsNavigation';
import styles from './AllProjects.module.scss'
import ProjectsSlider from '../../Components/allprojects/ProjectsSlider/ProjectsSlider';
import { useSelector } from 'react-redux';
import ProjectsList from '../../Components/allprojects/ProjectsList/ProjectsList';

function AllProjects() {

	const projectsCategories = useSelector(state => state.projects.projectsCategories),	
		projectsList = useSelector(state => state.projects.projectsList),
		searchValue = useSelector(state => state.projects.searchValue);


	let shownProjectsCategories = {...projectsCategories},
		shownProjectsList = [...projectsList];
	const shownBy = useSelector(state => state.projects.shownBy);

	if(searchValue){
		shownProjectsCategories = Object.fromEntries(Object.entries(projectsCategories)
								.map(([key, arr]) => [key, 
								arr.filter(item => 
								item.title.toLowerCase().includes(searchValue.toLowerCase()))]));
		shownProjectsList = Object.values(shownProjectsCategories).flat();
		console.log(shownProjectsCategories);
	}

	return (
		<div className={styles.container}>
			<ProjectsNavigation />
			{shownBy == 'category' ?
				<><ProjectsSlider title={'New Project'} projects={shownProjectsCategories.newProj}/>
				<ProjectsSlider title={'Time limit'} projects={shownProjectsCategories.timeLim}/></> : <ProjectsList arr={shownProjectsList}/>}
		</div>
	);
}

export default AllProjects;