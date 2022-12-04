import { MDBCard, MDBContainer, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

function Playlists() {
    const userState = useSelector((state) => state.user);

    return (
        <>
            <h1>Playlists</h1>
            <MDBContainer>
                <MDBRow size={12}>
                    {
                        userState.userPlaylists?.items?.map((item) => {
                            return (
                                <MDBCol size={3} className='overlow-hidden'>                                
                                    <MDBCard className='h-100'>
                                        <MDBCardBody>
                                            <img src={item.images[0].url} style={{width: '100px', height: '100px'}} />                                        
                                                {item.name}                                            
                                                {item.description}                                            
                                        </MDBCardBody>                                        
                                    </MDBCard>
                                </MDBCol>
                            )
                        })
                    }
                </MDBRow>
            </MDBContainer>
        </>
    )
}

export default Playlists;
