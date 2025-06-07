import React from 'react';
import ProjectsNavigation from '../Components/allprojects/ProjectsNavigation';
import './AllProjects-module.scss'
import ProjectsSlider from '../Components/allprojects/ProjectsSlider';

function AllProjects() {
	return (
		<div className='AllProjects'>
			<ProjectsNavigation/>
			<ProjectsSlider title={'New Project'} projects={[
				{title: 'Creating Mobile App Design',img: '01', subtitle: 'UI UX Design', progress: 75, deadline: 3},
				{title: 'Creating Perfect Website',img: '02', subtitle: 'Web Developer', progress: 85, deadline: 4},
				{title: 'Mobile App Design',img: '03', subtitle: 'UI UX Design', progress: 65, deadline: 3},
				{title: 'Creating Mobile Apps',img: '04', subtitle: 'Android Developer', progress: 95, deadline: 1}
			]}/>
			<ProjectsSlider title={'New Project'} projects={[
				{title: 'Creating Awesome Mobile Apps',img: '05', subtitle: 'UI UX Design', progress: 90, deadline: 1},
				{title: 'Creating Fresh Website',img: '06', subtitle: 'Web Developer', progress: 85, deadline: 2},
				{title: 'Creating Color Palletes',img: '07', subtitle: 'UI UX Design', progress: 100, deadline: 3},
				{title: 'Awesome Flutter Apps',img: '08', subtitle: 'Web Developer', progress: 75, deadline: 3}
			]}/>
		</div>
	);
}

export default AllProjects;