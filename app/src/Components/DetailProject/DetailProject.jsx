import React, { useEffect } from 'react';
import styles from './DetailProject.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TaskTable from '../AllTasks/TasksTable/TasksTable'
import { fetchProjects } from '../../store/projects/projectsSlice';
import { useTranslation } from 'react-i18next';
import { getDeadlineLabel } from '../../utils/deadlineUtils';


function DetailProject() {
	const { id } = useParams();
	const {t} = useTranslation();
	const dispatch = useDispatch();

	const projects = useSelector(state => state.projects.projectsList);
  	const tasks = useSelector(state => state.tasks.tasks);
  	const users = useSelector(state => state.users.users);

  	const project = projects.find(proj => proj.id == id);
  	const user = project ? users.find(u => u.id === project.managerId) : null;
	const displayedTasks = tasks.filter(task => task.projectId == id);

  	useEffect(() => {
		if (!projects.length) {
		  	dispatch(fetchProjects());
		}
	}, [dispatch, projects.length]);

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
						{getDeadlineLabel(project.deadlineAmount, t)}
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
