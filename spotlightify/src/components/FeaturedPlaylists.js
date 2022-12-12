import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
} from 'mdb-react-ui-kit';
import { setCurrentPlayback } from '../redux/playbackSlice';
import { setObject, setType } from '../redux/panelSlice';

function FeaturedPlaylists({ panelState, setPanelState }) {
    const userState = useSelector((state) => state.user);
    const access_token = useSelector((state) => state.user.tokens.access_token);
    const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {        
        handleGetFeaturedPlaylists().then(response => setFeaturedPlaylists(response));
    }, [userState])

    const handleGetFeaturedPlaylists = async () => {
        return fetch('/Spotify/featuredPlaylists', {
            method: 'POST',
            body: new URLSearchParams({
                limit: '20',
                access_token
            })
        }).then(response => response.json())
            .then(data => { return data })        
    }

    return (
        <div className='card-container'>
            <div className='headline'>
                <h3>{featuredPlaylists?.message}</h3>
            </div>
            <div className='card-array'>
                {                        
                    featuredPlaylists?.playlists?.items?.map((item) => {                        
                        return (                            
                            <div
                                onClick={() => {
                                    dispatch(setType('playlist'))
                                    dispatch(setObject(item))
                                    setPanelState(!panelState)
                                }}
                                className='card-box'
                            >
                                <img src={item?.images[0].url}/>                                            
                                <p className='card-text'>{item?.name}</p>                                
                            </div>
                               
                    )
                })
                }   
            </div>
        </div>       
    )
}

export default FeaturedPlaylists;
