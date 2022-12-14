import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBCard, MDBContainer, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { setObject, setType } from '../redux/panelSlice';
import { FaPlayCircle } from 'react-icons/fa';
import { setCurrentPlayback } from '../redux/playbackSlice';
function Artists({ panelState, setPanelState }) {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // need to figure out how to get entire list of artists so can alphabetize and sort
    return (
        <div className='card-container'>
            <div className='page-header'>
                <h1>Artists</h1>
            </div>
            <div className='track-array'>
                {
                    userState.followedArtists?.artists?.items.map((item) => {
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
                                    <img src={item.images[0].url} className='rounded-circle' style={{ borderRadius: '50%' }} />
                                </div>
                                <div
                                    onClick={() => {
                                    dispatch(setType('artist'))
                                    dispatch(setObject(item))
                                    setPanelState(!panelState)
                                }}
                                >

                                    <p className='card-text'>{item.name}</p>                                    
                                </div>
                            </div>
                        )
                    })
                    }
            </div>           
        </div>
    )
}

export default Artists;
