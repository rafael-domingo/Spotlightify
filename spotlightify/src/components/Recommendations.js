import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody
} from 'mdb-react-ui-kit';



function Recommendations() {
    const userState = useSelector((state) => state.user);
    const access_token = useSelector(state => state.user.tokens.access_token); 
    const [recommendations_seed_artists, setRecommendations_seed_artists] = useState();
    const [recommendations_seed_tracks, setRecommendations_seed_tracks] = useState();

    useEffect(() => {
        const seed_artists = [];        
        const seed_tracks = [];
        // only get first 5 values since Spotify API only accepts 5 seed values
        for (let index = 0; index < 5; index++) {
            seed_tracks.push(userState.topTracks?.items[index].id)
            seed_artists.push(userState.topArtists?.items[index].id)
        }            
        console.log(String(seed_artists));
        console.log(seed_tracks);        
        handleGetRecommendations(String(seed_tracks), 'tracks').then(response => setRecommendations_seed_tracks(response));
        handleGetRecommendations(String(seed_artists), 'artists').then(response => setRecommendations_seed_artists(response));
    }, [userState])

    const handleGetRecommendations = async (seed_ids, type) => {
        return fetch('/Spotify/recommendations', {
            method: 'POST',
            body: new URLSearchParams({
                access_token,
                limit: '20',
                type,
                seed_values: seed_ids
            })
        }).then(response => response.json())
        .then(data => {return data})
    }
    return (
        <>
            <MDBContainer style={{height: '20vh'}} fluid className='d-flex flex-wrap overflow-scroll'>
                <MDBRow className='w-100 d-flex flex-wrap'>
                    <MDBCol>
                        Your Recommendations
                    </MDBCol>
                </MDBRow>
                <MDBRow className='w-100 d-flex flex-nowrap overflow-scroll'>            
                    {                        
                        recommendations_seed_artists?.tracks.map((item) => {                        
                            return (                            
                                <MDBCol size={3} style={{ backgroundColor: 'pink' }} className='d-flex align-items-center justify-content-between'>                                    
                                    <MDBCard background='light' className='h-100'>
                                         <MDBCardBody className='p-0 w-100 d-flex align-items-center justify-content-between'>
                                            <img src={item.album.images[0].url} style={{ width: '30%', height: 'auto' }} />                                            
                                            {item.name}                                            
                                        </MDBCardBody>
                                    </MDBCard>                                 
                                </MDBCol>
                        )
                    })
                    }   
                     {                        
                        recommendations_seed_tracks?.tracks.map((item) => {                        
                            return (                            
                                <MDBCol size={3} style={{ backgroundColor: 'pink' }} className='d-flex align-items-center justify-content-between'>                                    
                                    <MDBCard background='light' className='h-100'>
                                         <MDBCardBody className='p-0 w-100 d-flex align-items-center justify-content-between'>
                                            <img src={item.album.images[0].url} style={{ width: '30%', height: 'auto' }} />                                            
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

export default Recommendations;