import React from 'react';
import styles from './MediumTitle.module.scss';


function MiddleTitle({text}) {
	return (
		<h2 className={styles.title}>
			{text}
		</h2>
	);
}

export default MiddleTitle;