import { MDBCard, MDBContainer, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setObject, setType } from '../redux/panelSlice';

function Playlists({ panelState, setPanelState }) {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    return (
        <div className='overflow-scroll' style={{height: '100vh'}}>
            <h1>Playlists</h1>
            <MDBContainer>
                <MDBRow size={12} className='d-flex justify-content-center'>
                    {
                        userState.userPlaylists?.items?.map((item) => {
                            return (
                                <MDBCol key={item?.id} size={3} className='m-1 d-flex flex-wrap justify-content-center align-items-center'>                                
                                    <MDBCard onClick={() => {
                                        dispatch(setType('playlist'))
                                        dispatch(setObject(item))
                                        setPanelState(!panelState)
                                    }} className='h-100 w-100'>
                                        <MDBCardBody>
                                            <img src={item.images[0].url} style={{width: '100px', height: '100px'}} />                                        
                                                <p className='w-100 text-align-center d-flex justify-content-center'>{item.name}</p>                                            
                                                {/* {item.description}                                             */}
                                        </MDBCardBody>                                        
                                    </MDBCard>
                                </MDBCol>
                            )
                        })
                    }
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default Playlists;
