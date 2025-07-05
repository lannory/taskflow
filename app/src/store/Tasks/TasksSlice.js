import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  editTask: null,
  selectedProjectId: null,
  searchValue: '',
  activeStatus: '',
  sortField: null,
  sortDirection: null,
  allTasksTicked: false,
  expandedRows: [],
  searchDate: '',
  loading: false,
  error: null,
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

export const createTask = createAsyncThunk('tasks/create', async (taskData, { getState, rejectWithValue }) => {
  console.log('createTask called with data:', taskData);
  try {
    // Создаем новую задачу с локальным ID
    const newTask = {
      id: getState().tasks.tasks.length + 1,
      prodjectID: taskData.prodjectID,
      tick: false,
      title: taskData.title,
      taskCreated: new Date().toISOString().split('T')[0],
      duoDate: taskData.duoDate,
      status: 'Pending',
      description: taskData.description || '',
      userID: taskData.userID // Оставляем как строку (имя пользователя)
    };

    console.log('Creating new task locally:', newTask);
    
    // Возвращаем новую задачу для обработки в extraReducers
    return newTask;
  } catch (err) {
    console.error('Error creating task:', err);
    return rejectWithValue(err.message || 'Error creating task');
  }
});

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
    setSelectedProject(state, action) {
      state.selectedProjectId = action.payload;
    },
    addEditTask(state, action) {
      const taskId = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      state.editTask = task ? { ...task } : null;
    },
    saveEditedTask(state, action) {
      const editedTask = action.payload;
      const index = state.tasks.findIndex(t => t.id === editedTask.id);
      if (index !== -1) {
        state.tasks[index] = editedTask;
      }
      state.editTask = null;
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(item => item.id !== action.payload);
      if (state.editTask?.id === action.payload) {
        state.editTask = null;
      }
    },
    addTask(state, action) {
      const newTask = action.payload;
      state.tasks.push(newTask);
    },
    clearEditTask(state) {
      state.editTask = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        console.error('Помилка при завантаженні задач:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        // Добавляем новую задачу в store
        state.tasks.push(action.payload);
        state.loading = false;
        state.error = null;
        console.log('Task added to store. Total tasks:', state.tasks.length);
      })
      .addCase(createTask.rejected, (state, action) => {
        console.error('Помилка при створенні задачі:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
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
  setSelectedProject,
  addTask,
  clearEditTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;