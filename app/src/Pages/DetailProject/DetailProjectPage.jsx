import React from 'react';
import DetailProject from '../../Components/DetailProject/DetailProject';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function DetailProjectPage() {

	const {id} = useParams();

	// const projectData = {
	// 	deadline: "1 Hour",
	// 	title: "Creating Awesome Mobile Apps",
	// 	banner: "01",
	// 	type: "UI UX Design . Apps Design",
	// 	peopleAmount: "200",
	// 	list: [
	// 		"Understanding the tools in Figma",
	// 		"Understand the basics of making designs",
	// 		"Designing a mobile application using figma",
	// 		"Designing a mobile application using figma"
 	// 	]
	// };

	return (
					<DetailProject id={id}/>
				);
}

export default DetailProjectPage;