import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: tasks,
  searchValue: '',
  activeStatus: '',
  sortField: null,
  sortDirection: null,
  allTasksTicked: false,
  expandedRows: [],
  searchDate: '',
  editTask: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetch', async (_, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;
        const res = await fetch('http://localhost:3000/api/tasks', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
            const data = await res.json();
            return rejectWithValue(data.message || 'Error fetching tasks');
        }

        const data = await res.json();
        return data;
    } catch (err) {
        return rejectWithValue(err.message || 'Network error');
    }
}
);

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
        if (task.tick === true) {
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
    changeTaskStatus(state, action) {
      const { id, status } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      task.status = status;
    },
    setExtendetRow(state, action) {
      const id = action.payload;
      const index = state.expandedRows.indexOf(id);
      if (index === -1) {
        state.expandedRows.push(id);
      } else {
        state.expandedRows.splice(index, 1);
      }
    },
    searchByDate(state, action) {
      const date = action.payload;
      if (state.searchDate === date) {
        state.searchDate = '';
      } else {
        state.searchDate = date;
      }
    },
    addEditTask(state, action) {
      // записквати в editTask 
      const taskId = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      state.editTask = task ? { ...task } : null;
    },
    saveEditedTask(state, action) {
      // зберігаєш відредагований такс 
      const editedTask = action.payload;
      const index = state.tasks.findIndex(t => t.id === editedTask.id);
      if (index !== -1) {
        state.tasks[index] = editedTask;
      }
      state.editTask = null;
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(item => item.id !== action.payload);
    }
    
  }

    },
    extraReducers: builder => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                console.error('Помилка при завантаженні задач:', action.payload);
            });
    }
})


export const {
  setSearchValue,
  setActiveStatus,
  toggleSort,
  toggleTask,
  toggleAllTasks,
  changeTaskStatus,
  setExtendetRow,
  deleteTask,
  searchByDate,
  addEditTask,
  saveEditedTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;