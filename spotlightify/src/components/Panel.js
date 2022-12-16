import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardSubTitle, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlayCircle } from 'react-icons/fa';
import { setCurrentPlayback } from '../redux/playbackSlice';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RiCloseCircleLine } from 'react-icons/ri';
function Panel({isActive, setPanelState}) {
    const panelState = useSelector((state) => state.panel); 
    const [panelHistory, setPanelHistory] = useState([]); // use to keep track of navigation levels -- enables navigating backward
    const access_token = useSelector((state) => state.user.tokens.access_token);
    const [scrolled, setScrolled] = React.useState(false);
    const windowRef = useRef();
    const dispatch = useDispatch();
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
                    const url = `https://api.spotify.com/v1/albums/${panelState?.object?.album?.id}/tracks`;
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
                                title: panelState?.object?.album?.name,
                                subtitle: panelState?.object?.album?.artists?.[0]?.name,
                                image: panelState?.object?.album?.images?.[0]?.url,
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

    useEffect(() => {
        windowRef.current.scrollTo(0, 0);
    }, [panelHistory])
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

    const handleScroll = (e) => {
        if (e.target.scrollTop > 0) {
            if (!scrolled) {
                setScrolled(true);    
            }            
        } else {
            setScrolled(false);
        }
    }

    return (
        <div
            className={`panel ${isActive ? 'panel-active' : ''}`}
            onScroll={handleScroll}
            ref={windowRef}
        >
            <div>


                
            
                <div className={`panel-header ${scrolled ? 'panel-header-scroll' : ''}`}>
                    <div
                        onClick={() => {
                            setPanelState(false)
                        }}
                        className='close-button'>
                        <RiCloseCircleLine style={{ height: '100%', width: '100%' }} />
                    </div>  
                    {
                    panelHistory.length > 1 && (
                            <div className='back-button' onClick={() => handlePanelBack()}>
                                <IoMdArrowRoundBack style={{ height: '100%', width: '100%' }} />
                            </div>
                    )
                    }   
                    <div>
                        <img src={panelHistory?.[panelHistory.length -1]?.image} />
                    </div>
                    <div style={{paddingLeft: '10px', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                        <h1>{panelHistory?.[panelHistory.length -1]?.title}</h1>
                        <p>{panelHistory?.[panelHistory.length - 1]?.subtitle}</p>
                    </div>
                
                </div>
                <div
                    className='panel-body'
                    
                >   
                <div className='panel-container'>
                {
                    panelHistory?.[panelHistory.length - 1]?.type === 'artist' && (<h1>Top Tracks</h1>)
                }
                {
                    panelHistory?.[panelHistory.length - 1]?.type !== 'artist' && (<h1>Tracks</h1>)           
                }                                
                    {       
                                     
                        panelHistory?.[panelHistory.length - 1]?.list?.map((item) => {     
                            console.log(item)                            
                            var showImage = panelHistory?.[panelHistory.length - 1]?.type === 'playlist' || panelHistory?.[panelHistory.length - 1]?.type === 'artist' 
                            return (
                                <div
                                    className='panel-item'
                                  
                                >   <div>                                        
                                        <div
                                            onClick={() => {
                                                console.log(item.album)
                                                dispatch(setCurrentPlayback(item))
                                            }}
                                            className='play-button'                                              
                                            >                                        
                                            <FaPlayCircle style={{ height: '50%', width: '50%'}}/>
                                        </div>    
                                        <img src={showImage ? item?.album.images[0].url : ''} style={showImage ? {} : { display: 'none' }} />
                                        <div style={showImage ? {display: 'none'} : {width: '50px', height: '50px'}}>
                                        </div>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}}>
                                        <p onClick={() => handlePanelClick(item)}>{item?.name}</p>                                
                                        <p>{item?.artists[0].name}</p>                                    
                                    </div>
                                </div>
                            )                            
                        })
                        
                    }
                    </div>                   
                    <div className='panel-container' style={panelHistory?.[panelHistory.length - 1]?.type !== 'artist' ? {display: 'none'}: {}}>

                    
                    {
                    panelHistory?.[panelHistory.length - 1]?.type === 'artist' && (<h1>Discography</h1>)
                    }                  
                    {
                        panelHistory?.[panelHistory.length - 1]?.type === 'artist' && (
                             panelHistory?.[panelHistory.length -1]?.sublist?.map((item) => {                        
                            return (        
                                
                                <div
                                    className='album-box'
                                    onClick={() => handlePanelClick(item)}
                                >
                                    <div
                                        className='play-button'
                                    >
                                        <img src={item?.images?.[0]?.url}/>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', width: '100%'}}>
                                        <p onClick={() => handlePanelClick(item)} className='card-text'>{item?.name}</p>                                
                                    </div>
                                </div>
                            )                            
                        })
                        )
                    }
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Panel;

