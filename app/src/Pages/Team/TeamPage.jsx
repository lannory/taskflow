import React from 'react';
import styles from './TeamPage.module.scss';
import TeamList from '../../Components/Team/TeamList';


function TeamPage(props) {
	return (
		<div className={styles.container}>
			<TeamList/>
		</div>
	);
}

export default TeamPage;