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
    const [newReleases, setNewReleases] = useState([]);
    const [show, setShow] = useState(false);
    const [scale, setScale] = useState(false);
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
            .then(navigate('/loading', { replace: true }))            
        }        
        fetch('/Spotify/client_credentials').then(response => response.json()).then(data => handleGetNewReleases(data))
    }, [0])

    const handleGetNewReleases = (data) => {
        fetch('/Spotify/newReleases', {
            method: 'POST',
            body: new URLSearchParams({
                access_token: data.access_token,
                limit: '50'
            })
        }).then(response => response.json())
            .then(data => {
                setNewReleases(data.albums.items)
                setTimeout(() => {
                    setShow(true)
                }, 2000);
            });
    }
   

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

    useEffect(() => {
        setTimeout(() => {
            setScale(!scale)
        }, 1000);
    })

   


    return (
        <div style={{background: 'linear-gradient(to right, #DDD6F3, #FAACA8)', zIndex: '-10'}}>
            <div className={`album-art-container ${show ? 'album-art-container-show' : ''}`}>
                {
                    newReleases.map((item, index) => {
                        if (index % 2) {
                            return (
                                <img className={`album-art ${scale ? 'album-art-animate': ''}`} src={item.images[0].url}/>
                            )
                        } else {
                            return (
                                <img className={`album-art ${scale ? 'album-art-animate-1': ''}`} src={item.images[0].url}/>
                            )
                        }
                       
                    })
                }
            </div>
            <div className='logo-div'>
                <div className='logo-container'>
                    <h1 className='logo'>Spot<span className={`inactive ${scale ? 'active' : ''}`}>light</span>ify</h1>    
                </div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
            
        </div>
    )
}

export default Welcome;