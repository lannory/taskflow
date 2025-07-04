import React from 'react';

import ProjectsNavigation from '../../Components/allprojects/ProjectsNavigation/ProjectsNavigation';
import styles from './AllProjects.module.scss'
import ProjectsSlider from '../../Components/allprojects/ProjectsSlider/ProjectsSlider';
import { useSelector } from 'react-redux';
import ProjectsList from '../../Components/allprojects/ProjectsList/ProjectsList';
import {useTranslation}from 'react-i18next';

function AllProjects() {

	const projectsCategories = useSelector(state => state.projects.projectsCategories),	
		projectsList = useSelector(state => state.projects.projectsList),
		searchValue = useSelector(state => state.projects.searchValue);

	const {t} = useTranslation()

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
				<><ProjectsSlider title={t('projects.title.newProject')} projects={shownProjectsCategories.newProj} />
				  <ProjectsSlider title={t('projects.title.timeLimit')} projects={shownProjectsCategories.timeLim} />
				</>
 				: <ProjectsList arr={shownProjectsList}/>}
		</div>
	);
}

export default AllProjects;