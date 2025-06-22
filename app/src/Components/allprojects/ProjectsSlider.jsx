import React, { useRef } from 'react';
import ProjectsItem from './ProjectsItem';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './Projects.module.scss';
import MediumTitle from '../MediumTitle/MediumTitle';


function ProjectsSlider({title, projects}) {
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3.2,
		slidesToScroll: 1,
 	 };

	const sliderRef = useRef();
	return (
		<div className={styles.sliderWrapper}>
			<div className={styles.sliderDesc}>
				{<MediumTitle text={title}/>}
				<div className={styles.sliderControls}>
					<button className={styles.prev} onClick={() => sliderRef?.current?.slickPrev()}>
						<i className="fa-solid fa-arrow-left"></i>
					</button>
					<button className={styles.next} onClick={() => sliderRef?.current?.slickNext()}>
						<i className="fa-solid fa-arrow-right"></i>
						<img src="../../../arrow-right.svg" alt="" />
					</button>
				</div>
			</div>
			<div className={styles.projectsSlider}>
				<Slider ref={sliderRef} {...settings}>
					{projects.map(item => <ProjectsItem obj={item} />)}
				</Slider>
			</div>
		</div>
	);
}

export default ProjectsSlider;