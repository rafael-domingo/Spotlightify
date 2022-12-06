import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setObject, setType } from '../redux/panelSlice';

function Tracks() {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    return (
        <div className='overflow-scroll' style={{ height: '100vh' }}>
            <h1>Tracks</h1>
            <MDBContainer>
                <MDBRow size={12}>                
                        {
                            userState.savedTracks?.items.map((item) => {
                                return (
                                    <MDBCol onClick={() => {
                                        dispatch(setType('track'))
                                        dispatch(setObject(item))
                                    }} size={12} className='d-flex justify-content-between m-1'>
                                        <img src={item.track?.album?.images[0].url} style={{height: '50px', width: '50px'}}/>
                                        <p>{item.track?.name}</p>
                                        <p> {item.track?.artists[0].name}</p>
                                    </MDBCol>
                                )
                            })
                        }                
                </MDBRow>
            </MDBContainer>

        </div>
    )
 
}

export default Tracks;