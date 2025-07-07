import React, { useEffect } from 'react';
import styles from './DetailProject.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import TaskTable from '../AllTasks/TasksTable/TasksTable'
import { fetchProjects } from '../../store/projects/projectsSlice';
import { useTranslation } from 'react-i18next';


function DetailProject({id}) {

	const {t} = useTranslation();


	const dispatch = useDispatch();


	useEffect(() => {
  		dispatch(fetchProjects());
	}, [dispatch]);


	const projects = useSelector(state => state.projects.projectsList);
	const project = projects.find(proj => proj.id == id);

	const tasks = useSelector(state => state.tasks.tasks);
	const displayedTasks = tasks.filter(task => task.projectId == id);

	const users = useSelector(state => state.users.users);
	const user = users.find((item) => project.managerId === item.id);


	if (!projects || projects.length === 0) {
  		return <p>Loading projects...</p>;
	}

	if(!users || users.length === 0){
		return <p>Loading users...</p>;
	}




	return (
		<div className={styles.wrapper}>
			<div className={styles.banner}>
				<img src={`/projects/${project.img}.png`}/>
			</div>	
			<div className={styles.descWrapper}>
				<h2 className={styles.title}>{project.title}</h2>
				<div className={styles.projectType}>
					<p>{project.type}</p>
				</div>
				<div className={styles.widget}>
					<p>
						<i className="fa-solid fa-users" style={{ color: "#54577a" }}></i>
						{t("projects.labels.manager")} 
						<img src={`/team/${user.img}.png`} className={styles.user} alt="" />
						{user.name}
					</p>
					<p>
						<i className="fa-regular fa-clock" style={{ color: "#54577a" }}></i>						
						{project.deadlineAmount} {t(`projects.deadline.${project.deadlineUnit}`)} {t('projects.deadline.left')}
					</p>
				</div>
				<div className={styles.desc}>
					<h3 className={styles.subtitle}>{t("projects.labels.desc")}</h3>
					<p className={styles.text}>
						{project.desc}
					</p>
				</div>
				<div className={styles.listWrapper}>
					<h3 className={styles.subtitle}>{t("projects.labels.tasks")}</h3>
					<TaskTable tasks={displayedTasks} isProjectsTasks={true}/>
				</div>
			</div>
		</div>
	);
}

export default DetailProject;
