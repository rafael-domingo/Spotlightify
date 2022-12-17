import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {        
    setTopTracks,
    setTopArtists,
    setSavedTracks,
    setSavedAlbums,
    setFollowedArtists,
    setUserPlaylists,
    setRecentlyPlayed
} from '../redux/userSlice';
import {
    MDBSpinner
} from 'mdb-react-ui-kit'
function Loading() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const access_token = useSelector(state => state.user.tokens.access_token);        
    const [loadingStatus, setLoadingStatus] = useState(false);

    useEffect(() => {
        handleGetUserTop('tracks').then(data => dispatch(setTopTracks(data)));   
        handleGetUserTop('artists').then(data => dispatch(setTopArtists(data)));
        handleGetUserLibrary('albums').then(data => dispatch(setSavedAlbums(data)));            
        handleGetUserLibrary('tracks').then(data => dispatch(setSavedTracks(data)));                                            
        handleGetUserPlaylists().then(data => dispatch(setUserPlaylists(data)));                                        
        handleGetRecentlyPlayed().then(data => dispatch(setRecentlyPlayed(data)));            
        handleGetFollowedArtists().then(data => dispatch(setFollowedArtists(data)));
        setTimeout(() => {
            navigate('../userhome', { replace: true });

        }, 2000);
    }, [0])
     const handleGetUserTop = async (type) => {
        // type is either 'tracks' or 'artists'
        return fetch('/Spotify/userTopItems', {
            method: 'POST',
            body: new URLSearchParams({
                access_token,
                type: type,
                time_range: 'short_term',
                limit: '50'
            })
        }).then(response => response.json())
            .then(data => { return data })                  
    }

    const handleGetUserLibrary = (type) => {
        // type is either 'albums' or 'tracks
        return fetch('/Spotify/userLibrary', {
            method: 'POST',
            body: new URLSearchParams({
                type: type,
                access_token: access_token,
                limit: '50'
            })
        }).then(response => response.json())
            .then(data => { return data })        
    }

    const handleGetUserPlaylists = () => {
        return fetch('/Spotify/userPlaylists', {
            method: 'POST',
            body: new URLSearchParams({
                limit: '50',
                access_token,
            })
        }).then(response => response.json())
            .then(data => { return data })        
    }

    const handleGetRecentlyPlayed = () => {
        return fetch('/Spotify/userRecentlyPlayed', {
            method: 'POST',
            body: new URLSearchParams({
                limit: '50',
                access_token,
            })
        }).then(response => response.json())
            .then(data => { return data })        
    }

    const handleGetNewReleases = () => {
        return fetch('/Spotify/newReleases', {
            method: 'POST',
            body: new URLSearchParams({
                access_token,
                limit: '50'
            })
        }).then(response => response.json())
            .then(data => { return data })        
    }

    const handleGetRecommendations = (seed_artists) => {
        return fetch('/Spotify/recommendations', {
            method: 'POST',
            body: new URLSearchParams({
                access_token,
                limit: '100',
                seed_artists: `${seed_artists[0]},${seed_artists[1]},${seed_artists[2]},${seed_artists[3]},${seed_artists[4]}`
            })
        }).then(response => response.json())
            .then(data => { return data })        
    }

    const handleGetFollowedArtists = () => {
        return fetch('/Spotify/userFollowedArtists', {
            method: 'POST',
            body: new URLSearchParams({
                access_token,
                limit: '50'                
            })
        }).then(response => response.json())
            .then(data => { return data })        
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
            <MDBSpinner/>
        </div>
    )
}

export default Loading;