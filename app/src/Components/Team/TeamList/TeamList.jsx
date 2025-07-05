import React from 'react';
import styles from './TeamList.module.scss';
import TeamItem from '../TeamItem/TeamItem';
import SmallTitle from '../../SmallTitle/SmallTitle';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function TeamList(props) {

	const {t} = useTranslation();

	const team = useSelector(state => state.users.users);


	return (
		<div className={styles.wrapper}>
			<SmallTitle text={t("team.title")} className={styles.TeamTitle}/>
			<div className={styles.list}>
				{team.map(item => <TeamItem obj={item} key={item.name} />)}
			</div>
		</div>
	);
}



export default TeamList;