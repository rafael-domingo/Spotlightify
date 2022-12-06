import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice';
import playbackReducer from '../redux/playbackSlice';
import panelReducer from '../redux/panelSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,      
        playback: playbackReducer,
        panel: panelReducer
    },
})