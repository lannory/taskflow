import React from 'react';
import SmallTitle from '../../SmallTitle/SmallTitle';
import styles from './ProjectsList.module.scss';
import ProjectsItem from '../ProjectsItem/ProjectsItem';
import { Empty } from 'antd';
import {useTranslation} from 'react-i18next';
import { useSelector } from 'react-redux';

function ProjectsList({ arr }) {

	const {t} = useTranslation();
	const filtred = useSelector(state => state.projects.filtred);
	const users = useSelector(state => state.users.users);


	let user;

	if(filtred.isFiltred){
		console.log(users)
		user = users.find(usr => usr.id == filtred.filtredBy);
	}


	return (
		<div className={styles.wrapper}>
			<SmallTitle text={!filtred.isFiltred ? t('projects.title.allProjects') : t('projects.labels.manager') + user.name} />
			<div className={styles.list}>
				{arr.length == 0 ? <Empty/> :arr.map(item => <ProjectsItem obj={item} key={item.title}/>)}
			</div>
		</div>
	);
}

export default ProjectsList;