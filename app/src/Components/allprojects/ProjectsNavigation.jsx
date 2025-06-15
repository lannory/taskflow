import React from 'react';
import { useRef } from 'react';
import styles from './Projects.module.scss';


function ProjectsNavigation() {

	const searchRef = useRef();


	return (
		<nav className={styles.projectsNav}>
			<form action="">
				<input
					type="text"
					className={styles.searchInput}
					placeholder="Search  Project"
					ref={searchRef}
				/>
				<button type="button" className={styles.searchBtn}>
					<i className="fa-light fa-magnifying-glass" style={{ color: '#8E92BC' }}></i>
				</button>
			</form>

			<div className={styles.navBtns}>
				<div className={styles.categoryMenu}>
					<button className={`${styles.categoryBtn} ${styles.btn}`}>
						<i className="fa-solid fa-list" style={{ color: '#8E92BC' }}></i>
						Category
					</button>
				</div>
				<button className={`${styles.sortBtn} ${styles.btn}`}>
					<i className="fa-regular fa-sort" style={{ color: '#8E92BC' }}></i>
					Sort By : Deadline
				</button>
			</div>
		</nav>
	);
}

export default ProjectsNavigation;