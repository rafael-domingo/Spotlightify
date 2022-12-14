import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody
} from 'mdb-react-ui-kit';
import { setObject, setType } from '../redux/panelSlice';
import { setCurrentPlayback } from '../redux/playbackSlice';
import { FaPlayCircle } from 'react-icons/fa';



function Recommendations({ panelState, setPanelState }) {
    const userState = useSelector((state) => state.user);
    const access_token = useSelector(state => state.user.tokens.access_token); 
    const [recommendations_seed_artists, setRecommendations_seed_artists] = useState();
    const [recommendations_seed_tracks, setRecommendations_seed_tracks] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        const seed_artists = [];        
        const seed_tracks = [];
        // only get first 5 values since Spotify API only accepts 5 seed values
        for (let index = 0; index < 5; index++) {
            seed_tracks.push(userState.topTracks?.items[index].id)
            seed_artists.push(userState.topArtists?.items[index].id)
        }            
        console.log(String(seed_artists));
        console.log(seed_tracks);        
        handleGetRecommendations(String(seed_tracks), 'tracks').then(response => setRecommendations_seed_tracks(response));
        handleGetRecommendations(String(seed_artists), 'artists').then(response => setRecommendations_seed_artists(response));
    }, [userState])

    const handleGetRecommendations = async (seed_ids, type) => {
        return fetch('/Spotify/recommendations', {
            method: 'POST',
            body: new URLSearchParams({
                access_token,
                limit: '20',
                type,
                seed_values: seed_ids
            })
        }).then(response => response.json())
            .then(data => { return data })        
    }
    return (
        <div className='card-container'>
            <div className='headline'>
                <h3>Recommendations</h3>
            </div>
            <div className='card-array'>
                {                        
                recommendations_seed_artists?.tracks.map((item) => {                        
                    return (                            
                        <div className='card-box'>
                            <div>
                                <div
                                    onClick={() => {
                                        console.log(item)
                                        dispatch(setCurrentPlayback(item))
                                    }}
                                    className='play-button'  
                                    style={{height: '200px', width: '200px'}}
                                    >                                        
                                    <FaPlayCircle style={{ height: '50%', width: '50%' }}/>
                                </div>
                                <img src={item.album.images[0].url} />     
                            </div>
                            <div
                                onClick={() => {
                                dispatch(setType('track'))
                                dispatch(setObject(item))
                                setPanelState(!panelState)
                                }}
                            >
                                    <p className='card-text'>{item.name}</p>
                                <p className='card-subtext'>{item.artists?.[0]?.name}</p>
                            </div>
                        </div>                                                                                              
                )   
                })  
                }   
                {                        
                recommendations_seed_tracks?.tracks.map((item) => {                        
                    return (     
                          <div className='card-box'>
                            <div>
                                <div
                                    onClick={() => {
                                        console.log(item)
                                        dispatch(setCurrentPlayback(item))
                                    }}
                                    className='play-button'  
                                    style={{height: '200px', width: '200px'}}
                                    >                                        
                                    <FaPlayCircle style={{ height: '50%', width: '50%' }}/>
                                </div>
                                <img src={item.album.images[0].url} />     
                            </div>
                            <div
                                onClick={() => {
                                dispatch(setType('track'))
                                dispatch(setObject(item))
                                setPanelState(!panelState)
                                }}
                            >
                                    <p className='card-text'>{item.name}</p>
                                <p className='card-subtext'>{item.artists?.[0]?.name}</p>
                            </div>
                        </div>  
                )
            })
            }      
            </div>
        </div>
                
        
    )
}

export default Recommendations;