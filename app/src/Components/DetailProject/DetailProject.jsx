import React from 'react';
import styles from './DetailProject.module.scss';
import { useSelector } from 'react-redux';


function DetailProject({id}) {

	const projects = useSelector(state => state.projects.projectsList);
	const project = projects.find(proj => proj.id == id);

	return (
		<div className={styles.wrapper}>
			<div className={styles.banner}>
				<img src={`/projects/${project.img}.png`}/>
			</div>	
			<div className={styles.descWrapper}>
				<h2 className={styles.title}>{project.title}</h2>
				<div className={styles.projectType}>
					<p>{project.type}</p>
					{/* <p className={styles.link}>+ Get Mentors</p> */}
				</div>
				<div className={styles.widget}>
					<p>
						<i className="fa-solid fa-users" style={{ color: "#54577a" }}></i>
						{project.people} Students Involved
					</p>
					<p>
						<i className="fa-regular fa-clock" style={{ color: "#54577a" }}></i>						
						{project.deadlineAmount} {project.deadlineUnit} left
					</p>
				</div>
				<div className={styles.desc}>
					<h3 className={styles.subtitle}>Description</h3>
					<p className={styles.text}>
						{project.desc}
					</p>
				</div>
				<div className={styles.listWrapper}>
					<h3 className={styles.subtitle}>Tasks</h3>
					{/* <ul className={styles.list}>
						{list.map((item, index) => (
							<li key={index} className={styles.listItem}>
								<div><i className="fa-solid fa-check" style={{ color: "#ffffff" }}></i></div>
								{item}
							</li>
						))}
					</ul> */}
				</div>
			</div>
		</div>
	);
}

export default DetailProject;
