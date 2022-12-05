import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPlayback: {},
    queue: [],
}

export const playbackSlice = createSlice({
    name: 'Playback',
    initialState,
    reducers: {
        setCurrentPlayback: (state, action) => {
            state.currentPlayback = action.payload
        },
        setQueue: (state, action) => {
            state.queue = action.payload
        }
    }
})

export const {
    setCurrentPlayback,
    setQueue
} = playbackSlice.actions;

export default playbackSlice.reducer;
