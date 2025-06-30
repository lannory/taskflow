import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getInitialToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token') || '';
};

const initialState = {
  // isAuth: !!getInitialToken(),
  isAuth: true,
  token: getInitialToken(),
  error: null
};

export const signInAsync = createAsyncThunk('auth/signin', async ({ username, password, rememberMe }, { rejectWithValue }) => {
  try {
    const res = await fetch('http://localhost:3000/signin', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.message || 'Invalid credentials');
    }

    if (rememberMe) {
      localStorage.setItem('token', data.token);
    } else {
      sessionStorage.setItem('token', data.token);
    }

    return { token: data.token };
  } catch (err) {
    return rejectWithValue(err.message || 'Network error');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.token = '';
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    },
    setAuth: (state, action) => {
      state.isAuth = true;
      state.token = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.isAuth = true;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.isAuth = false;
        state.token = '';
        state.error = action.payload || 'Login failed';
      });
  }
});

export const { logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
