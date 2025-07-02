import React from 'react';
import styles from './TeamList.module.scss';
import TeamItem from '../TeamItem/TeamItem';
import SmallTitle from '../../SmallTitle/SmallTitle';
import { useSelector } from 'react-redux';

function TeamList(props) {

	const team = useSelector(state => state.users.users);

	return (
		<div className={styles.wrapper}>
			<SmallTitle text={'Your Team and & Managers'} className={styles.TeamTitle}/>
			<div className={styles.list}>
				{team.map(item => <TeamItem obj={item} key={item.name} />)}
			</div>
		</div>
	);
}



export default TeamList;