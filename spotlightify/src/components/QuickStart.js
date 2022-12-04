import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';

function QuickStart() {
    const userState = useSelector((state) => state.user);
    const [quickStartArray, setQuickStartArray] = useState([]);
    useEffect(() => {
        const array = [];
        for (let index = 0; index < 3; index++) {
            array.push({
                name: userState.userPlaylists?.items[index].name,
                image: userState.userPlaylists?.items[index].images[0].url,
                obj: userState.userPlaylists?.items[index]
            })            
        }
        for (let index = 0; index < 3; index++) {
            array.push({
                name: userState.topTracks?.items[index].name,
                image: userState.topTracks?.items[index].album.images[0].url,
                obj: userState.topTracks?.items[index]
            })            
        }
        for (let index = 0; index < 3; index++) {
            array.push({
                name: userState.topArtists?.items[index].name,
                image: userState.topArtists?.items[index].images[0].url,
                obj: userState.topArtists?.items[index]
            })            
        }
        setQuickStartArray(array);
    }, [userState])
    return (
        <>
            <MDBContainer fluid className='d-flex flex-wrap justify-content-center align-items-start'>
                <MDBRow className='w-100 d-flex flex-wrap align-items-center justify-content-center'>
                    <MDBCol size={9}>
                        <h3>Good evening</h3>
                    </MDBCol>
                    
                </MDBRow>
                <MDBRow className='w-90 d-flex flex-wrap align-items-center justify-content-center'>
                    
                    {
                        quickStartArray.map((item) => {
                            return (
                                <MDBCol style={{backgroundColor: 'pink'}} key={item.obj?.id} size={3} className='d-flex align-items-center justify-content-between m-1'>                        
                                    <img src={item.image} style={{ width: '100px', height: '100px' }} />                                    
                                    {item.name}                                    
                                </MDBCol>                                
                            )
                        })
                    }                                       
                </MDBRow>
            </MDBContainer>
        </>
    )
}

export default QuickStart;
