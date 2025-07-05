import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    language: 'en',
    theme: localStorage.getItem('theme') || 'light',
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers:{
        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
})

export const { setTheme, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;