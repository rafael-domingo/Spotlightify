import React, { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';

function RecentlyPlayed() {
    const userState = useSelector((state) => state.user);
    const [recentlyPlayedArray, setRecentlyPlayedArray] = useState([]);

    useEffect(() => {
        const array = [];
        userState.recentlyPlayed?.items.forEach((item) => {
            array.push({
                name: item?.track?.name,
                image: item?.track?.album?.images[0].url,
                obj: item
            })
        })         
        setRecentlyPlayedArray(array);        
    }, [userState])

    return (
        <>
            <MDBContainer style={{height: '20vh'}} fluid className='d-flex flex-wrap overflow-scroll'>
                <MDBRow className='w-100 d-flex flex-wrap'>
                    <MDBCol>
                        Recently Played
                    </MDBCol>
                </MDBRow>
                <MDBRow className='w-100 d-flex flex-nowrap overflow-scroll'>            
                    {                        
                        recentlyPlayedArray.map((item) => {                        
                            return (                            
                                <MDBCol size={3} style={{ backgroundColor: 'pink' }} className='d-flex align-items-center justify-content-between'>                                    
                                    <MDBCard background='light' className='h-100'>
                                         <MDBCardBody className='p-0 w-100 d-flex align-items-center justify-content-between'>
                                            <img src={item.image} style={{ width: '30%', height: 'auto' }} />                                            
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

export default RecentlyPlayed;

