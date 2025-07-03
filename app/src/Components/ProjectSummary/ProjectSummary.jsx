import React from 'react';
import styles from './ProjectSummary.module.scss'
import { Dropdown } from 'antd';
import StatusButton from '../AllTasks/StatusButton/StatusButton';


function ProjectSummary() {
	const getProjects = () => [
		{
			key: 'Project1',
			label: 'Project1',
		},
		{
			key: 'Project2',
			label: 'Project2',
		},
	];

	const getManagers = () => [
		{
			key: 'Manager1',
			label: 'Manager1',
		},
		{
			key: 'Manager2',
			label: 'Manager2',
		},
	];

	const getStatus = () => [
		{
			key: 'Active',
			label: 'Active',
		},
		{
			key: 'Completed',
			label: 'Completed',
		},
		{
			key: 'On Hold',
			label: 'On Hold',
		}
	];


	const getTaskStatuses = () => [
		{
			key: 'Approved',
			label: (
				<StatusButton text='Approved' />
			),
			onClick: (e) => {
				e.domEvent.stopPropagation();
				// dispatch(changeTaskStatus({ id: task.id, status: 'Approved' }))
			}
		},
		{
			key: 'Re work',
			label: (
				<StatusButton text='Re work' />
			),
			onClick: (e) => {
				e.domEvent.stopPropagation();
				// dispatch(changeTaskStatus({ id: task.id, status: 'Re work' }))
			}
		},
		{
			key: 'Pending',
			label: (
				<StatusButton text='Pending' />
			),
			onClick: (e) => {
				e.domEvent.stopPropagation();
				// dispatch(changeTaskStatus({ id: task.id, status: 'Pending' }))
			}
		},
		{
			key: 'In progress',
			label: (
				<StatusButton text='In progress' />
			),
			onClick: (e) => {
				e.domEvent.stopPropagation();
				// dispatch(changeTaskStatus({ id: task.id, status: 'In progress' }))
			}
		},
	]

	return (
		<div className={styles.ProjectSummaryContainer}>
			<div className={styles.ProjectSummaryHeader}>
				<h4 className={styles.ProjectSummaryTitle}>Project Summary</h4>
				<div className={styles.ProjectSummaryDropdowns}>
					<Dropdown
						menu={{ items: getProjects() }}
						trigger={['click']}
					>
						<span className={styles.dropdownElement}>
							Project<i className="fa-solid fa-angle-down"></i>
						</span>
					</Dropdown>
					<Dropdown
						menu={{ items: getManagers() }}
						trigger={['click']}
					>
						<span className={styles.dropdownElement}>
							Manager<i className="fa-solid fa-angle-down"></i>
						</span>
					</Dropdown>
					<Dropdown
						menu={{ items: getStatus() }}
						trigger={['click']}
					>
						<span className={styles.dropdownElement}>
							Status<i className="fa-solid fa-angle-down"></i>
						</span>
					</Dropdown>
				</div>

			</div>
			<table className={styles.ProjectSummaryTable}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Project manager</th>
						<th>Due date</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Web page Design</td>
						<td>Kiran kan</td>
						<td>May 25, 2024</td>
						<td>
							<Dropdown
								menu={{ items: getTaskStatuses() }}
								trigger={['click']}
								getPopupContainer={(triggerNode) => triggerNode.parentNode}
							>
								<span
									onClick={(e) => {
										e.stopPropagation();
										e.preventDefault();
									}}
								>
									<StatusButton text={'Approved'} />
								</span>
							</Dropdown>
						</td>
					</tr>
					<tr>
						<td>Uolyft AI app </td>
						<td>Neelesh kumar </td>
						<td>Jun 20, 2024</td>
						<td>
							<Dropdown
								menu={{ items: getTaskStatuses() }}
								trigger={['click']}
								getPopupContainer={(triggerNode) => triggerNode.parentNode}
							>
								<span
									onClick={(e) => {
										e.stopPropagation();
										e.preventDefault();
									}}
								>
									<StatusButton text={'Approved'} />
								</span>
							</Dropdown>
						</td>
					</tr>
					<tr>
						<td>Marketing and Branding</td>
						<td>Rakesh Kumar</td>
						<td>July 13, 2024</td>
						<td>
							<Dropdown
								menu={{ items: getTaskStatuses() }}
								trigger={['click']}
								getPopupContainer={(triggerNode) => triggerNode.parentNode}
							>
								<span
									onClick={(e) => {
										e.stopPropagation();
										e.preventDefault();
									}}
								>
									<StatusButton text={'Approved'} />
								</span>
							</Dropdown>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default ProjectSummary;