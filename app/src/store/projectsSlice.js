import {createSlice} from '@reduxjs/toolkit';

const defaultProjects = {
		newProj: [
				{title: 'Creating Mobile App Design',img: '01', subtitle: 'UI UX Design', progress: 75, deadlineAmount: '3', deadlineUnit: 'days', id: 1},
				{title: 'Creating Perfect Website',img: '02', subtitle: 'Web Developer', progress: 85, deadlineAmount: '4', deadlineUnit: 'days', id: 2},
				{title: 'Mobile App Design',img: '03', subtitle: 'UI UX Design', progress: 65, deadlineAmount: '3', deadlineUnit: 'days', id: 3},
				{title: 'Creating Mobile Apps',img: '04', subtitle: 'Android Developer', progress: 95, deadlineAmount: '1', deadlineUnit: 'day', id: 4}
			],
		timeLim: [
					{title: 'Creating Awesome Mobile Apps',img: '05', subtitle: 'UI UX Design', progress: 90, deadlineAmount: '1', deadlineUnit: 'hour', id: 5},
					{title: 'Creating Fresh Website',img: '06', subtitle: 'Web Developer', progress: 85, deadlineAmount: '2', deadlineUnit: 'hours', id: 6},
					{title: 'Creating Color Palletes',img: '07', subtitle: 'UI UX Design', progress: 100, deadlineAmount: '1', deadlineUnit: 'hour', id: 7},
					{title: 'Awesome Flutter Apps',img: '08', subtitle: 'Web Developer', progress: 75, deadlineAmount: '3', deadlineUnit: 'hours', id: 8}
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