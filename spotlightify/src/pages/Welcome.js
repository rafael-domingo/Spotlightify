import React, {useState, useEffect} from 'react';
import {
    MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    setUser,
    setTokens,
    setTopTracks,
    setTopArtists,
    setSavedTracks,
    setSavedAlbums,
    setFollowedArtists,
    setUserPlaylists
} from '../redux/userSlice';

function Welcome() {
    const [active, setActive] = React.useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setActive(true);
        }, 2000);
        console.log(searchParams.get('access_token'));
        if (searchParams.get('access_token') !== null) {
            handleTokens()
            handleGetUserInfo()            
            .then(navigate('/loading'))            
        }
    }, [0])

    const handleLogin = () => {
        fetch('/Spotify/authorizeSpotify')
            .then(response => response.json())
            .then(data => window.location.assign(data))      
    }

    const handleTokens = () => {
        const tokenObject = {
            access_token: searchParams.get('access_token'),
            refresh_token: searchParams.get('refresh_token')
        }
        dispatch(setTokens(tokenObject))
    }

    const handleGetUserInfo = async () => {
        fetch('/Spotify/user', {
            method: 'POST',
            body: new URLSearchParams({
                access_token: searchParams.get('access_token')
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data?.error)
                dispatch(setUser(data))
            })
    }

   


    return (
        <div className={`welcome ${active ? 'active-welcome' : ''}`}>
            <div className='logo-div'>
                <h1 className={`logo ${active ? 'active-logo' : ''}`}>Spotlightify</h1>                                
                <MDBBtn
                    className='login-button'
                    color='none'
                    rounded
                    onClick={() => handleLogin()}
                >
                    Login
                </MDBBtn>            
            </div>
            
        </div>
    )
}

export default Welcome;