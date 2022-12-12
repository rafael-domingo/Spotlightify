import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { setObject, setType } from '../redux/panelSlice';

function Albums({ panelState, setPanelState }) {
    const userState = useSelector((state => state.user));
    const dispatch = useDispatch();

    return (
        <div className='overflow-scroll' style={{height: '100vh'}}>
            <h1>Albums</h1>
            <MDBContainer>
                <MDBRow size={12} className='d-flex justify-content-center'>
                    {
                        userState.savedAlbums?.items?.map((item) => {
                            return(
                                <MDBCol className='m-1 d-flex justify-content-center align-items-center flex-wrap' size={3}>
                                    <MDBCard onClick={() => {
                                        dispatch(setType('album'))
                                        dispatch(setObject(item))
                                        setPanelState(!panelState)
                                    }} className='h-100 w-100'>
                                        <MDBCardBody>
                                            <img src={item?.album?.images[0].url} style={{ width: '100px', height: '100px' }} />                                                                                    
                                            <p className='w-100 text-align-center d-flex justify-content-center'>{item.album.name}</p>                                                                                  
                                            <p className='text-muted w-100 text-align-center d-flex justify-content-center'>{item.album.artists[0].name}</p>                                                                
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

export default Albums;