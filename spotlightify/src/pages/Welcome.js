import React, {useState, useEffect} from 'react';
import {
    MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function Welcome() {
    const [active, setActive] = React.useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setActive(true);
        }, 2000);
    }, [0])

    const handleLogin = () => {
        fetch('/Spotify/authorizeSpotify')
            .then(response => response.json())
            .then(data => window.location.assign(data))      
    }

    const handleGetUserInfo = () => {
        fetch('/Spotify/user', {
            method: 'POST',
            body: new URLSearchParams({
                access_token: searchParams.get('access_token')
            })
        }).then(response => response.json())
        .then(data => console.log(data))
    }

    const handleGetUserTop = (type) => {
        fetch('/Spotify/userTopItems', {
            method: 'POST',
            body: new URLSearchParams({
                access_token: searchParams.get('access_token'),
                type: type,
                time_range: 'short_term',
                limit: '50'
            })
        }).then(response => response.json())
        .then(data => console.log(data))
    }

    const handleGetUserLibrary = (type) => {
        fetch('/Spotify/userLibrary', {
            method: 'POST',
            body: new URLSearchParams({
                type: type,
                access_token: searchParams.get('access_token'),
                limit: '50'
            })
        }).then(response => response.json())
        .then(data => console.log(data))
    }

    const handleGetNewReleases = () => {
        fetch('/Spotify/newReleases', {
            method: 'POST',
            body: new URLSearchParams({
                access_token: searchParams.get('access_token'),
                limit: '50'
            })
        }).then(response => response.json())
        .then(data => console.log(data))
    }

    const handleGetRecommendations = (seed_artists) => {
        fetch('/Spotify/recommendations', {
            method: 'POST',
            body: new URLSearchParams({
                access_token: searchParams.get('access_token'),
                limit: '100',
                seed_artists: `${seed_artists[0]},${seed_artists[1]},${seed_artists[2]},${seed_artists[3]},${seed_artists[4]}`
            })
        }).then(response => response.json())
        .then(data => console.log(data))
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
                <MDBBtn
                    onClick={() => handleGetUserInfo()}
                >
                    Get User
                </MDBBtn>
                 <MDBBtn
                    onClick={() => handleGetUserTop('tracks')}
                >
                    Get Top Tracks
                </MDBBtn>
                 <MDBBtn
                    onClick={() => handleGetUserTop('artists')}
                >
                    Get Top Artists
                </MDBBtn>
                 <MDBBtn
                    onClick={() => handleGetUserLibrary('albums')}
                >
                    Get User Albums
                </MDBBtn>
                 <MDBBtn
                    onClick={() => handleGetUserLibrary('tracks')}
                >
                    Get User Tracks
                </MDBBtn>
                 <MDBBtn
                    onClick={() => handleGetNewReleases()}
                >
                    Get New Releases
                </MDBBtn>
            </div>
            
        </div>
    )
}

export default Welcome;