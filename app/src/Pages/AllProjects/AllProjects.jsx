import React from 'react';
import ProjectsNavigation from '../../Components/allprojects/ProjectsNavigation/ProjectsNavigation';
import styles from './AllProjects.module.scss';
import ProjectsSlider from '../../Components/allprojects/ProjectsSlider/ProjectsSlider';
import ProjectsList from '../../Components/allprojects/ProjectsList/ProjectsList';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectProjectsWithProgress } from '../../store/selectors/selectors';
import BigButton from '../../Components/BigButton/BigButton';
import { filterProjects } from '../../store/projects/projectsSlice';

function AllProjects() {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const projectsCategories = useSelector(selectProjectsWithProgress);
	const searchValue = useSelector(state => state.projects.searchValue);
	const shownBy = useSelector(state => state.projects.shownBy);
	const filtred = useSelector(state => state.projects.filtred);

	let flatProjectsList = Object.values(projectsCategories).flat();

	if (filtred.isFiltred) {
		flatProjectsList = flatProjectsList.filter(proj => proj.managerId === filtred.filtredBy);
	}

	let filteredCategories = { ...projectsCategories };

	if (searchValue) {
		filteredCategories = Object.fromEntries(
			Object.entries(projectsCategories).map(([key, arr]) => [
				key,
				arr.filter(project =>
					project.title.toLowerCase().includes(searchValue.toLowerCase())
				)
			])
		);
		flatProjectsList = Object.values(filteredCategories).flat();
	}

	const handleShowAll = () => {
		dispatch(filterProjects());
	};

	return (
		<div className={styles.container}>
			{!filtred.isFiltred ? (
				<>
					<ProjectsNavigation />
					{shownBy === 'category' ? (
						<>
							<ProjectsSlider title={t('projects.title.newProject')} projects={filteredCategories.newProj || []} />
							<ProjectsSlider title={t('projects.title.timeLimit')} projects={filteredCategories.timeLim || []} />
						</>
					) : (
						<ProjectsList arr={flatProjectsList} />
					)}
				</>
			) : (
				<>
					<ProjectsList arr={flatProjectsList} />
					<div className={styles.btn}>
						<BigButton onClick={handleShowAll} text={t('show')} style='purple' />
					</div>
				</>
			)}
		</div>
	);
}

export default AllProjects;
