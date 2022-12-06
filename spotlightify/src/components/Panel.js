import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function Panel({isActive}) {
    const panelState = useSelector((state) => state.panel);
    const [trackList, setTrackList] = useState([]);
    const access_token = useSelector((state) => state.user.tokens.access_token);

    useEffect(() => {
        console.log(isActive);
        if (!isActive) {
            setTrackList([]);
        } else {
  if (panelState?.type === 'playlist') {
        const headers = {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        } 
            console.log(panelState?.object?.tracks?.href);
        fetch(panelState?.object?.tracks?.href, {
            method: 'GET',
            headers
        })
            .then(response => response.json())
            .then(data => {
                const newArray = [];
                data.items.map((item) => {
                    newArray.push(item.track);
                })
                setTrackList(newArray);
            })   
        } else if (panelState?.type === 'album') {
            setTrackList(panelState?.object?.album?.tracks?.items);
        } else if (panelState?.type === 'track') {
            const url = `https://api.spotify.com/v1/albums/${panelState?.object?.track?.album?.id}/tracks`;
             const headers = {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            } 
            fetch(url, {
                method: 'GET',
                headers
            })
                .then(response => response.json())
                .then(data => {
                    setTrackList(data.items)
                });
        }
        }
     
      
    }, [panelState, isActive])

    return (
        <div className={`panel ${isActive ? 'panel-active' : ''}`}>
            <MDBCard>
                <MDBRow style={{position: 'sticky', top: 0}}>
                    <MDBCol size={3}>
                        <MDBCardImage position='top' src={panelState?.object?.images?.[0].url} />
                    </MDBCol>
                    <MDBCol size={9}>
                        <MDBCardTitle>{panelState?.object?.name}</MDBCardTitle>
                    </MDBCol>
                </MDBRow>
                
                <MDBCardBody style={{top: 100}}>                    
                    {       
                                     
                        trackList.map((item) => {                        
                            return (                        
                                <p className='text-muted'>{item?.name}</p>                                
                            )                            
                        })
                        
                        }
                        
                </MDBCardBody>
            </MDBCard>
           
        </div>
    )
}

export default Panel;

