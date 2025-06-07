import React from 'react';
import ProjectsItem from './ProjectsItem';


function ProjectsSlider({title, projects}) {

	return (
		<div className='slider-wrapper'>
			<div className="slider-desc">
				<h2 className="projects-title">{title}</h2>
				<div className="slider-controls">
					<button className="prev"><img src="../../../arrow-left.svg" alt="" /></button>
					<button className="next"><img src="../../../arrow-right.svg" alt="" /></button>
				</div>
			</div>
			<div className="slider">
				{projects.map(item => <ProjectsItem obj={item}/>)}
				
			</div>
		</div>
	);
}

export default ProjectsSlider;