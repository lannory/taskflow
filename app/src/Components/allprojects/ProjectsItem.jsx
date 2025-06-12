import React from 'react';
import './Projects.scss'
import { LinearProgress } from '@mui/material';

function ProjectsItem({obj}) {
	return (
		<div className='project'>
			<img src={"../../../public/projects/" + obj.img + '.png'} alt="" className="project-banner" />
			<div className="project-desc">
				<h3 className="project-title">{obj.title}</h3>
				<p className="project-subtitle">{obj.subtitle}</p>
			</div>
			<div className="project-progress">
				<div className="progress-desc">
					<p className="progress-text">Progress</p>
					<p className="progress">{obj.progress}%</p>
				</div>
				<LinearProgress variant='determinate' value={obj.progress} sx={{
																		'.MuiLinearProgress-bar': {
																		backgroundColor: '#546FFF',
																		},}} />
			</div>
				<div className="project-deadline">
					<div className="deadline">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path fillRule="evenodd" clipRule="evenodd" d="M19.25 10.001C19.25 15.11 15.109 19.251 10 19.251C4.891 19.251 0.75 15.11 0.75 10.001C0.75 4.89198 4.891 0.750977 10 0.750977C15.109 0.750977 19.25 4.89198 19.25 10.001Z" stroke="#54577A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M13.4311 12.9437L9.66113 10.6947V5.84766" stroke="#54577A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
						{obj.deadline} left
					</div>
				</div>
			
		</div>
	);
}

export default ProjectsItem;