import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    tokens: {},
    topTracks: {},
    topArtists: {},    
    savedTracks: {},
    savedAlbums: {},
    followedArtists: {},
    userPlaylists: {},
    recentlyPlayed: {},
}

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setTokens: (state, action) => {
            state.tokens = action.payload
        },
        setTopTracks: (state, action) => {
            state.topTracks = action.payload
        },
        setTopArtists: (state, action) => {
            state.topArtists = action.payload
        },
        setSavedTracks: (state, action) => {
            state.savedTracks = action.payload
        },
        setSavedAlbums: (state, action) => {
            state.savedAlbums = action.payload
        },
        setFollowedArtists: (state, action) => {
            state.followedArtists = action.payload
        },
        setUserPlaylists: (state, action) => {
            state.userPlaylists = action.payload
        },
        setRecentlyPlayed: (state, action) => {
            state.recentlyPlayed = action.payload
        },
        resetUser: () => initialState
    }
})

export const {
    setUser,
    setTokens,
    setTopTracks,
    setTopArtists,
    setSavedTracks,
    setSavedAlbums,
    setFollowedArtists,
    setUserPlaylists,
    setRecentlyPlayed,
    resetUser
} = userSlice.actions;

export default userSlice.reducer;