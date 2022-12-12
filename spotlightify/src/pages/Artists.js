import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBCard, MDBContainer, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { setObject, setType } from '../redux/panelSlice';
function Artists({ panelState, setPanelState }) {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // need to figure out how to get entire list of artists so can alphabetize and sort
    return (
        <div className='overflow-scroll' style={{height: '100vh'}}>
            <h1>Artists</h1>
            <MDBContainer>
                <MDBRow size={12}>
                    {
                        userState.followedArtists?.artists?.items.map((item) => {
                            return (
                                <MDBCol onClick={() => {
                                    dispatch(setType('artist'))
                                    dispatch(setObject(item))
                                    setPanelState(!panelState)
                                }} className='d-flex justify-content-center align-items-center flex-wrap' size={3}>
                                    <img src={item.images[0].url} style={{ with: '100px', height: '100px' }} className='rounded-circle' />
                                    <p className='w-100 text-align-center d-flex justify-content-center'>{item.name}</p>                                    
                                </MDBCol>
                            )
                        })
                    }
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default Artists;
