import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    type: {}, // song, album, artist, or playlist
    object: {}, // place object of item clicked for reference     
}

export const panelSlice = createSlice({
    name: 'Panel',
    initialState,
    reducers: {
        setType: (state, action) => {
            state.type = action.payload
        },
        setObject: (state, action) => {
            state.object = action.payload
        }        
    }
})

export const {
    setType,
    setObject
} = panelSlice.actions;

export default panelSlice.reducer;