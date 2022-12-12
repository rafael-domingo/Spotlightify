import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardSubTitle, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function Panel({isActive}) {
    const panelState = useSelector((state) => state.panel); 
    const [panelHistory, setPanelHistory] = useState([]); // use to keep track of navigation levels -- enables navigating backward
    const access_token = useSelector((state) => state.user.tokens.access_token);

    // useeffect to load panel when clicking from main page
    useEffect(() => {
        console.log(isActive);
        if (!isActive) {            
            setPanelHistory([]);
        } else {
            setPanelHistory([...panelHistory, panelState]);
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
                        const panelObject = {
                        title: panelState?.object?.name,
                        subtitle: panelState?.object?.description,
                        image: panelState?.object?.images?.[0]?.url,
                        list: newArray,
                        type: panelState?.type,
                        object: panelState?.object
                        }   
                        setPanelHistory([...panelHistory, panelObject]);
                    })                                
                } else if (panelState?.type === 'album') {
                    const panelObject = {
                        title: panelState?.object?.album?.name,
                        subtitle: panelState?.object?.album?.artists?.[0]?.name,
                        image: panelState?.object?.album?.images?.[0]?.url,
                        list: panelState?.object?.album?.tracks?.items,
                        type: panelState?.type,
                        object: panelState?.object
                    }
                    setPanelHistory([...panelHistory, panelObject]);              
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
                            const panelObject = {
                                title: panelState?.object?.track?.album?.name,
                                subtitle: panelState?.object?.track?.album?.artists?.[0]?.name,
                                image: panelState?.object?.track?.album?.images?.[0]?.url,
                                list: data.items,
                                type: panelState?.type,
                                object: panelState?.object
                            }
                            setPanelHistory([...panelHistory, panelObject]);
                        });
                } else if (panelState?.type === 'artist') {
                    var topTracks = [];
                    const url = `https://api.spotify.com/v1/artists/${panelState?.object?.id}/top-tracks?market=US`;
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
                            console.log(data)
                            topTracks = data.tracks;
                            const urlAlbums = `https://api.spotify.com/v1/artists/${panelState?.object?.id}/albums?include_groups=album,single`;           
                        fetch(urlAlbums, {
                            method: 'GET',
                            headers
                        })
                        .then(response => response.json())
                        .then(data => {                                                      
                            const panelObject = {
                                title: panelState?.object?.name,
                                subtitle: panelState?.object?.genres?.[0],
                                image: panelState?.object?.images?.[0]?.url,
                                list: topTracks,
                                sublist: data.items,
                                type: panelState?.type,
                                object: panelState?.object

                            }
                            setPanelHistory([...panelHistory, panelObject]);
                        })
                        })
                    
                }
                }
     
      
    }, [panelState, isActive])

    // set new states when clicking link inside a panel and add to panelhistory
    const handlePanelBack = () => {
        setPanelHistory((current) => current.slice(0, -1));
    }

    const handlePanelClick = (item) => {
        console.log(item)
        if (item?.type === 'artist') {

        } else if (item?.type === 'album') {
            const url = `https://api.spotify.com/v1/albums/${item?.id}/tracks`;
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
                    const panelObject = {
                        title: item?.name,
                        subtitle: item?.artists?.[0]?.name,
                        image: item?.images?.[0]?.url,
                        list: data.items,
                        type: item?.type,
                        object: item
                    }
                    setPanelHistory([...panelHistory, panelObject]);
                })
        } else if (item?.type === 'track') {
            // check if looking at an album, if so, don't proceed
            if (panelHistory?.[panelHistory.length - 1]?.type !== 'track' && panelHistory?.[panelHistory.length - 1]?.type !== 'album' ) {
                const url = `https://api.spotify.com/v1/albums/${item.album?.id}/tracks`;
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
                        const panelObject = {
                            title: item?.album?.name,
                            subtitle: item?.album?.artists?.[0]?.name,
                            image: item?.album?.images?.[0]?.url,
                            list: data.items,
                            type: item?.type,
                            object: item
                        }
                        setPanelHistory([...panelHistory, panelObject]);
                    });
            }
           
        }
    }

    return (
        <div className={`panel ${isActive ? 'panel-active' : ''}`}>
            <MDBCard>
                <MDBRow style={{position: 'sticky', top: 0}}>
                    <MDBCol size={3}>
                        <MDBCardImage position='top' src={panelHistory?.[panelHistory.length -1]?.image} />
                    </MDBCol>
                    <MDBCol size={9}>
                        <MDBCardTitle>{panelHistory?.[panelHistory.length -1]?.title}</MDBCardTitle>
                        <MDBCardSubTitle>{panelHistory?.[panelHistory.length - 1]?.subtitle}</MDBCardSubTitle>
                    </MDBCol>
                </MDBRow>
                
                <MDBCardBody style={{ top: 100 }}>             
                    {
                        panelHistory.length > 1 && (
                            <MDBBtn onClick={() => handlePanelBack()}>Back</MDBBtn>
                        )
                    }    
                    {       
                                     
                        panelHistory?.[panelHistory.length -1]?.list?.map((item) => {                        
                            return (                        
                                <p onClick={() => handlePanelClick(item)} className='text-muted'>{item?.name}</p>                                
                            )                            
                        })
                        
                    }
                    {
                        panelState?.type === 'artist' && (
                             panelHistory?.[panelHistory.length -1]?.sublist?.map((item) => {                        
                            return (                        
                                <p onClick={() => handlePanelClick(item)} className='text'>{item?.name}</p>                                
                            )                            
                        })
                        )
                    }
                        
                </MDBCardBody>
            </MDBCard>
           
        </div>
    )
}

export default Panel;

