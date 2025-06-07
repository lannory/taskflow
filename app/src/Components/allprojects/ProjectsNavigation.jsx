import React from 'react';
import { useRef } from 'react';
import './Projects.scss';


function ProjectsNavigation() {

	const searchRef = useRef();


	return (
		<nav className='projects-nav'>
			<form action="">
				<input type="text" className='search-input' placeholder='Search  Project' ref={searchRef}/>
				<button type='button' className='search-btn'>
					<img src="../../../public/search-normal.svg" alt="" />
				</button>
			</form>
			<div className="nav-btns">
				<button className="category-btn btn">
					<img src="../../../public/category.svg" alt="" />
					Category
				</button>
				<button className="sort-btn btn">
					<img src="../../../public/category.svg" alt="" />
					Sort By : Deadline
				</button>
			</div>
		</nav>
	);
}

export default ProjectsNavigation;