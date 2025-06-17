import { createSlice } from '@reduxjs/toolkit';
import tasks from '../../../public/tasks';


const initialState = {
    tasks: tasks,
    searchValue: '',
    activeStatus: '',
    sortField: null,
    sortDirection: null,
    allTasksTicked: false,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setActiveStatus(state, action) {
            state.activeStatus = action.payload;
        },
        toggleSort(state, action) {
            const field = action.payload;
            if (state.sortField !== field) {
                state.sortField = field;
                state.sortDirection = 'asc';
            } else if (state.sortDirection === 'asc') {
                state.sortDirection = 'desc';
            } else {
                state.sortField = null;
                state.sortDirection = null;
            }
        },
        toggleTask(state, action) {
            const id = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                if(task.tick === true){
                    state.allTasksTicked = false;
                }
                task.tick = !task.tick;
            }
        },
        toggleAllTasks(state) {
            const allSelected = state.tasks.every(t => t.tick);
            const newValue = !allSelected;

            state.tasks.forEach(t => t.tick = newValue);
            state.allTasksTicked = newValue;
        },
        deleteTask(state, action) {
            state.tasks = state.tasks.filter(item => item.id !== action.payload);

                        // state.data = state.data.filter(item => item.id !== action.payload);

        }



    }
})

export const {
    setSearchValue,
    setActiveStatus,
    toggleSort,
    toggleTask,
    toggleAllTasks,
    deleteTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;