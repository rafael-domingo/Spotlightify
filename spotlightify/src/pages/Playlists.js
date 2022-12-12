import { MDBCard, MDBContainer, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setObject, setType } from '../redux/panelSlice';

function Playlists({ panelState, setPanelState }) {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    return (
        <div className='card-container'>
            <div>
                <h1>Playlists</h1>
            </div>
            <div className='card-array' style={{flexWrap: 'wrap', overflowY: 'scroll', height: '100vh'}}>
                {
                    userState.userPlaylists?.items?.map((item) => {
                        return (
                            <div 
                                onClick={() => {
                                    dispatch(setType('playlist'))
                                    dispatch(setObject(item))
                                    setPanelState(!panelState)
                                }}
                                className='card-box'>
                                    <img src={item.images[0].url} />                                        
                                    <p className='card-text'>{item.name}</p>                                                                                        
                            </div>                               
                        )
                    })
                }
            </div>                      
        </div>
    )
}

export default Playlists;
