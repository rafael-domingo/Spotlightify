import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBCard, MDBContainer, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { setObject, setType } from '../redux/panelSlice';
function Artists({ panelState, setPanelState }) {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // need to figure out how to get entire list of artists so can alphabetize and sort
    return (
        <div className='card-container'>
            <div className='headline'>
                <h1>Artists</h1>
            </div>
            <div className='card-array' style={{flexWrap: 'wrap', overflowY: 'scroll', height: '100vh'}}>
                {
                    userState.followedArtists?.artists?.items.map((item) => {
                        return (
                            <div onClick={() => {
                                dispatch(setType('artist'))
                                dispatch(setObject(item))
                                setPanelState(!panelState)
                            }}
                                className='card-box'>
                                <img src={item.images[0].url} className='rounded-circle' style={{ borderRadius: '50%' }} />
                                <p className='card-text'>{item.name}</p>                                    
                            </div>
                        )
                    })
                    }
            </div>           
        </div>
    )
}

export default Artists;
