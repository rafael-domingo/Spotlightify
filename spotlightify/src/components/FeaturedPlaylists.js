import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
} from 'mdb-react-ui-kit';

function FeaturedPlaylists() {
    const userState = useSelector((state) => state.user);
    const access_token = useSelector((state) => state.user.tokens.access_token);
    const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

    useEffect(() => {        
        handleGetFeaturedPlaylists().then(response => setFeaturedPlaylists(response));
    }, [userState])

    const handleGetFeaturedPlaylists = async () => {
        return fetch('/Spotify/featuredPlaylists', {
            method: 'POST',
            body: new URLSearchParams({
                limit: '20',
                access_token
            })
        }).then(response => response.json())
            .then(data => { return data })        
    }

    return (
        <>
             <MDBContainer style={{height: '20vh'}} fluid className='d-flex flex-wrap overflow-scroll'>
                <MDBRow className='w-100 d-flex flex-wrap'>
                    <MDBCol>
                        {featuredPlaylists?.message}
                    </MDBCol>
                </MDBRow>
                <MDBRow className='w-100 d-flex flex-nowrap overflow-scroll'>            
                    {                        
                        featuredPlaylists?.playlists?.items?.map((item) => {                        
                            return (                            
                                <MDBCol size={3} style={{ backgroundColor: 'pink' }} className='d-flex align-items-center justify-content-between'>                                    
                                    <MDBCard background='light' className='h-100'>
                                         <MDBCardBody className='p-0 w-100 d-flex align-items-center justify-content-between'>
                                            <img src={item.images[0].url} style={{ width: '30%', height: 'auto' }} />                                            
                                            {item.name}                                            
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

export default FeaturedPlaylists;
