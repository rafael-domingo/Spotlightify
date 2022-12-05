import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice';
import playbackReducer from '../redux/playbackSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,      
        playback: playbackReducer,
    },
})