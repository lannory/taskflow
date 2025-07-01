import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    language: 'en',
    theme: 'white',
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers:{

    }
})

export default settingsSlice.reducer;