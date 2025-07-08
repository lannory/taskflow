import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { calculateDaysLeft } from '../../utils/calculateDaysLeft';

export const fetchProjects = createAsyncThunk(
	'projects/fetch',
	async (_, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.token;
			const res = await fetch('http://localhost:3000/api/projects', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			if (!res.ok) {
				const data = await res.json();
				return rejectWithValue(data.message || 'Failed to fetch projects');
			}
			const data = await res.json();
			return data;
		} catch (err) {
			return rejectWithValue(err.message || 'Network error');
		}
	}
);

const initialState = {
	projectsList: [],
	projectsCategories: {},
	shownBy: 'category',
	sortType: null,
	sortDirection: null,
	searchValue: '',
	filtred: {
		isFiltred: false,
		filtredBy: null
	}
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

			entries = entries.map(([key, arr]) => [
				key,
				arr.map(project => ({
				  	...project,
				  	deadlineAmount: calculateDaysLeft(project.deadline)
				}))
			]);

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
		deleteProject: (state, action) => {
			const id = action.payload;

			const entries = Object.entries(state.projectsCategories);
			state.projectsCategories = Object.fromEntries(entries.map(([key, arr]) => [key, arr.filter(item => item.id != id)]));

			state.projectsList = Object.values(state.projectsCategories).flat();

		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
			return state;
		},
		addProject: (state, action) => {
			const project = action.payload;

			const deadlineAmount = calculateDaysLeft(project.deadline);

			const newProject = { ...project, deadlineAmount };

			const category = project.category || 'newProj';

			if (state.projectsCategories[category]) {
			  state.projectsCategories[category].push(newProject);
			} else {
			  state.projectsCategories[category] = [newProject];
			}

			state.projectsList = Object.values(state.projectsCategories).flat();
		},
		editProject: (state, action) => {
			const updatedProject = action.payload;
			const entries = Object.entries(state.projectsCategories);

			state.projectsCategories = Object.fromEntries(
			  	entries.map(([key, arr]) => [
					key,
					arr.map(project => project.id === updatedProject.id ? updatedProject : project)
			  	])
			);

			state.projectsList = Object.values(state.projectsCategories).flat();
		},
		updateProject: (state, action) => {
			const updated = action.payload;
			const entries = Object.entries(state.projectsCategories);
			state.projectsCategories = Object.fromEntries(
			  	entries.map(([key, arr]) => [
					key,
					arr.map((item) => (item.id === updated.id ? updated : item))
			  	])
			);
			state.projectsList = Object.values(state.projectsCategories).flat();
		},
		filterProjects: (state, action) =>{
			if(action.payload){
				state.filtred.isFiltred = true;
			}else{
				state.filtred.isFiltred = false;
			}
			state.filtred.filtredBy = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProjects.fulfilled, (state, action) => {
				const rawCategories = action.payload || {};

  				const enrichedCategories = Object.fromEntries(
    				Object.entries(rawCategories).map(([category, arr]) => [
      					category,
      					arr.map(project => ({
        					...project,
        					deadlineAmount: calculateDaysLeft(project.deadline)
      					}))
    				])
  				);

  				state.projectsCategories = enrichedCategories;
  				state.projectsList = Object.values(enrichedCategories).flat();
			})
			.addCase(fetchProjects.rejected, (state, action) => {
				console.error('Failed to fetch projects:', action.payload);
			});
	}
});

export const { 
	changeSort, 
	changeShown, 
	sorting, 
	deleteProject, 
	setSearchValue, 
	addProject, 
	editProject, 
	updateProject, 
	filterProjects 
} = projectsSlice.actions;

export default projectsSlice.reducer;