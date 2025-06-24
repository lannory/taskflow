import React from 'react';
import styles from './DetailProject.module.scss';


function DetailProject({ deadline, title, banner, type, peopleAmount, list }) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.banner}>
				<img src={`/projects/detail/${banner}.png`} alt={title} />
			</div>
			<div className={styles.descWrapper}>
				<h2 className={styles.title}>{title}</h2>
				<div className={styles.projectType}>
					<p>{type}</p>
					{/* <p className={styles.link}>+ Get Mentors</p> */}
				</div>
				<div className={styles.widget}>
					<p>
						<i className="fa-solid fa-users" style={{ color: "#54577a" }}></i>
						{peopleAmount} Students Involved
					</p>
					<p>
						<i className="fa-regular fa-clock" style={{ color: "#54577a" }}></i>						
						{deadline}
					</p>
				</div>
				<div className={styles.desc}>
					<h3 className={styles.subtitle}>Description</h3>
					<p className={styles.text}>
						Follow the video tutorial above. Understand how to use each tool in the Figma application. Also learn how to make a good and correct design. Starting from spacing, typography, content, and many other design hierarchies. Then try to make it yourself with your imagination and inspiration.
					</p>
				</div>
				<div className={styles.listWrapper}>
					<h3 className={styles.subtitle}>Essence of Assessment</h3>
					<ul className={styles.list}>
						{list.map((item, index) => (
							<li key={index} className={styles.listItem}>
								<div><i className="fa-solid fa-check" style={{ color: "#ffffff" }}></i></div>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
			
		</div>
	);
}

export default DetailProject;
