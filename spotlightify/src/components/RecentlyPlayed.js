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
import { FaPlayCircle } from 'react-icons/fa';

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
                            <div className='card-box'>
                                <div>
                                    <div
                                        onClick={() => {
                                            console.log(item.obj.track)
                                            dispatch(setCurrentPlayback(item.obj.track))
                                        }}
                                        className='play-button'  
                                        style={{height: '200px', width: '200px'}}
                                        >                                        
                                        <FaPlayCircle style={{ height: '50%', width: '50%' }}/>
                                    </div>
                                    <img src={item.image} />                                            
                                </div>
                                <div
                                    onClick={() => {
                                    dispatch(setType('track'))
                                    dispatch(setObject(item.obj.track))
                                    setPanelState(!panelState)
                                    }}
                                >
                                    <p className='card-text'>{item.name}</p>
                                    <p className='card-subtext'>{item.obj?.track?.artists?.[0]?.name}</p>
                                    </div>
                            </div>                                       
                    )
                })
                }    
            </div>
        </div>                                      
        
    )
}

export default RecentlyPlayed;

