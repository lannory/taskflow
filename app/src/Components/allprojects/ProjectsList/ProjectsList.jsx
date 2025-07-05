import React from 'react';
import SmallTitle from '../../SmallTitle/SmallTitle';
import styles from './ProjectsList.module.scss';
import ProjectsItem from '../ProjectsItem/ProjectsItem';
import { Empty } from 'antd';
import {useTranslation} from 'react-i18next';

function ProjectsList({ arr }) {

	const {t} = useTranslation();

	return (
		<div className={styles.wrapper}>
			<SmallTitle text={t('projects.title.allProjects')} />
			<div className={styles.list}>
				{arr.length == 0 ? <Empty/> :arr.map(item => <ProjectsItem obj={item} key={item.title}/>)}
			</div>
		</div>
	);
}

export default ProjectsList;