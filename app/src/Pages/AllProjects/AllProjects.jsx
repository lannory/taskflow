import React from 'react';

import ProjectsNavigation from '../../Components/allprojects/ProjectsNavigation/ProjectsNavigation';
import styles from './AllProjects.module.scss'
import ProjectsSlider from '../../Components/allprojects/ProjectsSlider/ProjectsSlider';
import { useDispatch, useSelector } from 'react-redux';
import ProjectsList from '../../Components/allprojects/ProjectsList/ProjectsList';
import {useTranslation}from 'react-i18next';
import BigButton from '../../Components/BigButton/BigButton';
import { filterProjects } from '../../store/projects/projectsSlice';

function AllProjects() {

	const projectsCategories = useSelector(state => state.projects.projectsCategories),	
		projectsList = useSelector(state => state.projects.projectsList),
		searchValue = useSelector(state => state.projects.searchValue),
		filtred = useSelector(state => state.projects.filtred);

	const {t} = useTranslation();
	const dispatch = useDispatch();

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

	if(filtred.isFiltred){
		shownProjectsList = projectsList.filter(proj => proj.managerId == filtred.filtredBy);
	}

	const handleShowAll = () =>{
		shownProjectsList = [...projectsList];
		console.log(filtred.isFiltred)
		dispatch(filterProjects());
		console.log(filtred.isFiltred)

	}

	return (
		<div className={styles.container}>
			
			{!filtred.isFiltred ? 
				(<>
					<ProjectsNavigation/>
					{shownBy == 'category' ?
					<><ProjectsSlider title={t('projects.title.newProject')} projects={shownProjectsCategories.newProj} />
					<ProjectsSlider title={t('projects.title.timeLimit')} projects={shownProjectsCategories.timeLim} />
					</>
					: <ProjectsList arr={shownProjectsList}/>}
				</>
				) 
				: (<>
						<ProjectsList arr={shownProjectsList}/>
						<div className={styles.btn}>
							<BigButton onClick={handleShowAll} text='Show All' style='purple'/>
						</div>
				</>)
			}
		</div>
	);
}

export default AllProjects;