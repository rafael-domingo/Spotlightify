import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setObject, setType } from '../redux/panelSlice';
import { FaPlayCircle } from 'react-icons/fa';
import { setCurrentPlayback } from '../redux/playbackSlice';

function Tracks({ panelState, setPanelState }) {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    return (
        <div className='track-container'>
            <div className='page-header'>
                <h1>Tracks</h1>
            </div>
            <div className='track-array'>
                {
                    userState.savedTracks?.items.map((item) => {
                        return (
                            <div className='track-item'>
                                <div>
                                    <div
                                        onClick={() => {                                            
                                            dispatch(setCurrentPlayback(item.track))
                                        }}
                                        className='play-button'>
                                        <FaPlayCircle style={{height: '50%', width: '50%'}}/>
                                    </div>
                                    <img src={item.track?.album?.images[0].url}/>
                                </div>
                                <div
                                    onClick={() => {
                                        dispatch(setType('track'))
                                        dispatch(setObject(item.track))
                                        setPanelState(!panelState);
                                    }}     
                                    className='track-text-container'>
                                    <p className='track-text' style={{textAlign: 'left'}}>{item.track?.name}</p>
                                    <p className='track-subtext'> {item.track?.artists[0].name}</p>
                                </div>
                            </div>                            
                        )
                    })
                }     
            </div>          
        </div>
    )
 
}

export default Tracks;