import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const fetchUsers = createAsyncThunk(
  'users',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch('https://api-taskflow-kyqf.onrender.com/api/team', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const data = await res.json();
        return rejectWithValue(data.message || 'Failed to fetch tasks');
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.error('Error fetching users:', action.payload);
      });
  }
});

export default usersSlice.reducer;
