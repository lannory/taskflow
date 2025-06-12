import React, { useRef } from 'react';
import ProjectsItem from './ProjectsItem';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




function ProjectsSlider({title, projects}) {
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
 	 };

	const sliderRef = useRef();
	return (
		<div className='slider-wrapper'>
			<div className="slider-desc">
				<h2 className="projects-title">{title}</h2>
				<div className="slider-controls">
					<button className="prev" onClick={() => sliderRef?.current?.slickPrev()}><img src="../../../arrow-left.svg" alt="" /></button>
					<button className="next" onClick={() => sliderRef?.current?.slickNext()}><img src="../../../arrow-right.svg" alt="" /></button>
				</div>
			</div>
			<div className="projects-slider">
				<Slider ref={sliderRef} {...settings}>
					{projects.map(item => <ProjectsItem obj={item} />)}
				</Slider>
				
				
			</div>
		</div>
	);
}

export default ProjectsSlider;