import React from 'react';
import styles from './Team.module.scss';
import TeamItem from './TeamItem';


function TeamList(props) {

	const team = [
		{
			name: "Jessica Jane",
			job: "Web Developer",
			desc: "Hi, I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web . . . ",
			taskCount: 40,
			rating: 4.7,
			reviews: 750,
			img: "01"
		},
		{
			name: "Alex Stanton",
			job: "UI / UX Designer",
			desc: "Hi, I'm Alex Stanton. I am a doctoral student at Oxford University majoring in UI / UX  . . .  ",
			taskCount: 60,
			rating: 4.9,
			reviews: 970,
			img: "02"
		},
		{
			name: "Antoine Griezmann",
			job: "Android Developer",
			desc: "Hi, I'm Antoine Griezmann. I'm an Android Developer at Google company . . .",
			taskCount: 50,
			rating: 4.8,
			reviews: 830,
			img: "03"
		},
		{
			name: "Anna White",
			job: "3D Design",
			desc: "Hi, I'm Anna White. I'm a professional 3D Designer at Blender company . . .",
			taskCount: 60,
			rating: 4.8,
			reviews: 870,
			img: "04"
		},
		{
			name: "Richard Kyle",
			job: "2D Design",
			desc: "Hi, I'm Richard Kyle. I'm a professional 2D Designer at Photoshop company . . .",
			taskCount: 60,
			rating: 4.7,
			reviews: 730,
			img: "05"
		},
		{
			name: "Julia Philips",
			job: "IOS Developer",
			desc: "Hi, I'm Julia Philips. I'm a senior manager at Apple company . . .",
			taskCount: 60,
			rating: 4.9,
			reviews: 910,
			img: "06"
		},
		
	]

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Your Team and & Managers</h2>
			<div className={styles.list}>
				{team.map(item => <TeamItem obj={item} key={item.name}/>)}
			</div>
		</div>
	);
}



export default TeamList;