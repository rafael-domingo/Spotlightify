import React, { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
} from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPlayback } from '../redux/playbackSlice';
import { setObject, setType } from '../redux/panelSlice';

function RecentlyPlayed({ panelState, setPanelState }) {
    const userState = useSelector((state) => state.user);
    const [recentlyPlayedArray, setRecentlyPlayedArray] = useState([]);
    const dispatch = useDispatch();

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
        <div className='card-container'>
            <div className='headline'>
                <h3>Recently Played</h3>
            </div>
            <div className='card-array'>
                    {                        
                    recentlyPlayedArray.map((item) => {                        
                        return (                            
                            <div
                                onClick={() => {
                                    dispatch(setType('track'))
                                    dispatch(setObject(item.obj.track))
                                    setPanelState(!panelState)
                                }}
                                className='card-box'>
                                <img src={item.image} />                                            
                                <p className='card-text'>{item.name}</p>
                                <p className='card-subtext'>{item.obj?.track?.artists?.[0]?.name}</p>
                            </div>                                       
                    )
                })
                }    
            </div>
        </div>                                      
        
    )
}

export default RecentlyPlayed;

