import { MDBCard, MDBContainer, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setObject, setType } from '../redux/panelSlice';
import { setCurrentPlayback } from '../redux/playbackSlice';
import { FaPlayCircle } from 'react-icons/fa';

function Playlists({ panelState, setPanelState }) {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    return (
        <div className='card-container'>
            <div className='page-header'>
                <h1>Playlists</h1>
            </div>
            <div className='track-array'>
                {
                    userState.userPlaylists?.items?.map((item) => {
                        return (
                             <div className='card-box'>
                                <div
                                    style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                                >
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
                                    <img src={item?.images[0].url}/>                                            
                                </div>
                                <div
                                    onClick={() => {
                                    dispatch(setType('playlist'))
                                    dispatch(setObject(item))
                                    setPanelState(!panelState)
                                }}
                                >
                                    <p className='card-text'>{item?.name}</p>  
                                    </div>
                                </div>                               
                        )
                    })
                }
            </div>                      
        </div>
    )
}

export default Playlists;
