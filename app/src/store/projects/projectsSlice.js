import {createSlice} from '@reduxjs/toolkit';

const defaultProjects = {
	newProj: [
		{
			title: 'Creating Mobile App Design',
			id: 1,
			img: '01',
			subtitle: 'UI UX Design',
			progress: 75,
			deadlineAmount: '3',
			deadlineUnit: 'days',
			people: 3,
			desc: 'Follow the video tutorial above. Understand how to use each tool in the Figma application. Also learn how to make a good and correct design. Starting from spacing, typography, content, and many other design hierarchies. Then try to make it yourself with your imagination and inspiration.'
		},
		{
			id: 2,
			title: 'Creating Perfect Website',
			img: '02',
			subtitle: 'Web Developer',
			progress: 85,
			deadlineAmount: '4',
			deadlineUnit: 'days',
			people: 43,
			desc: 'Build a modern and responsive website using HTML, CSS, and JavaScript. Learn how to create clean layouts, optimize performance, and ensure a great user experience. Use animations and interactions that enhance, not distract. Then, try to recreate a landing page from your favorite site.'
		},
		{
			id: 3,
			title: 'Mobile App Design',
			img: '03',
			subtitle: 'UI UX Design',
			progress: 65,
			deadlineAmount: '3',
			deadlineUnit: 'days',
			people: 221,
			desc: 'Design an intuitive mobile interface that focuses on user flow and functionality. Explore how to create wireframes, apply consistent styles, and maintain design harmony across screens. Practice by reimagining an existing app with your own design improvements.'
		},
		{
			id: 4,
			title: 'Creating Mobile Apps',
			img: '04',
			subtitle: 'Android Developer',
			progress: 95,
			deadlineAmount: '1',
			deadlineUnit: 'day',
			people: 4,
			desc: 'Develop a native Android application using Kotlin or Java. Learn how to manage layouts, work with APIs, and implement smooth navigation. Focus on clean code structure and good UX principles. Try building a simple to-do or weather app.'
		},
	],
	timeLim: [
		{
			id: 5,
			title: 'Creating Awesome Mobile Apps',
			img: '05',
			subtitle: 'UI UX Design',
			progress: 90,
			deadlineAmount: '1',
			deadlineUnit: 'hour',
			people: 513,
			desc: 'Quickly design a high-impact mobile app concept focusing on visual appeal and usability. Use Figma or Adobe XD to sketch your ideas and turn them into clickable prototypes. Emphasize simplicity and clarity in every element you create.'
		},
		{
			id: 6,
			title: 'Creating Fresh Website',
			img: '06',
			subtitle: 'Web Developer',
			progress: 85,
			deadlineAmount: '2',
			deadlineUnit: 'hours',
			people: 122,
			desc: 'Create a sleek and fresh website design tailored for a portfolio or blog. Learn how to apply modern UI patterns, responsive design, and lightweight frameworks. Focus on clean code and elegant animations to enhance user engagement.'
		},
		{
			id: 7,
			title: 'Creating Color Palletes',
			img: '07',
			subtitle: 'UI UX Design',
			progress: 100,
			deadlineAmount: '1',
			deadlineUnit: 'hour',
			people: 432,
			desc: 'Explore the fundamentals of color theory and how to build stunning palettes. Learn about contrast, accessibility, and mood setting through color. Try creating a few themed palettes for apps or websites and test them in mockups.'
		},
		{
			id: 8,
			title: 'Awesome Flutter Apps',
			img: '08',
			subtitle: 'Web Developer',
			progress: 75,
			deadlineAmount: '3',
			deadlineUnit: 'hours',
			people: 267,
			desc: 'Develop beautiful cross-platform apps using Flutter. Learn to structure widgets, manage state efficiently, and build reusable components. Practice by cloning simple UI screens and enhancing them with your own custom touches.'
		}
	]
	
}


const initialState = {
	projectsList: Object.values(defaultProjects).flat(),
	projectsCategories: defaultProjects,
	shownBy: 'category',
	sortType: null,
	sortDirection: null,
	searchValue: ''
}


const projectsSlice = createSlice({
	initialState,
	name: 'projects',
	reducers: {
		changeSort: (state, action) => {
			state.sortType = action.payload.type;
			state.sortDirection = action.payload.direction;
		}, 
		changeShown: (state, action) => {
			state.shownBy = action.payload;
			
			return state;
		},
		sorting: (state, action) => {
			let entries = Object.entries(state.projectsCategories);

			if(state.sortType == 'deadline'){
				if(state.sortDirection == 'increase'){
					state.projectsCategories = Object.fromEntries(entries.map(([key, arr]) => [key, arr.sort((a, b) => a.deadlineAmount - b.deadlineAmount)]));
				}
				else{
					state.projectsCategories = Object.fromEntries(entries.map(([key, arr]) => [key, arr.sort((a, b) => b.deadlineAmount - a.deadlineAmount)]));
				}
			}else{
				if(state.sortDirection == 'increase'){
					state.projectsCategories = Object.fromEntries(entries.map(([key, arr]) => [key, arr.sort((a, b) => a.progress - b.progress)]));
				}
				else{
					state.projectsCategories = Object.fromEntries(entries.map(([key, arr]) => [key, arr.sort((a, b) => b.progress - a.progress)]));
				}
			}


			state.projectsList = Object.values(state.projectsCategories).flat();
			return state;
		},
		deleteProject: (state, action) =>{
			const id = action.payload;
			
			const entries = Object.entries(state.projectsCategories);
			state.projectsCategories = Object.fromEntries(entries.map(([key, arr]) => [key, arr.filter(item => item.id != id)]));
		
			state.projectsList = Object.values(state.projectsCategories).flat();
			
		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
			return state;
		}
	}
});

export const {changeSort, changeShown, sorting, deleteProject, setSearchValue} = projectsSlice.actions;

export default projectsSlice.reducer;