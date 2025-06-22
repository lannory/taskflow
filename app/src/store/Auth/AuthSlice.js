import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: true,
  token: '',
  error: null
};

export const signInAsync = createAsyncThunk('auth/signin', async ({ username, password }, { rejectWithValue }) => {
    try {
      const body = { username, password };

      const res = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || 'Invalid credentials');
      }

      return { token: data.token };
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.isAuth = true;
        state.token = action.payload.token;
        state.error = null;
        // localStorage.setItem('isAuth', true);
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.isAuth = false;
        state.token = '';
        state.error = action.payload || 'Login failed';
        // localStorage.setItem('isAuth', false);
      });
  }
});

export default authSlice.reducer;