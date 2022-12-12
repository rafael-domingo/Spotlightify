import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setObject, setType } from '../redux/panelSlice';

function Tracks({ panelState, setPanelState }) {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    return (
        <div className='track-container'>
            <div className='headline'>
                <h1>Tracks</h1>
            </div>
            <div className='track-array'>
                {
                    userState.savedTracks?.items.map((item) => {
                        return (
                            <div onClick={() => {
                                dispatch(setType('track'))
                                dispatch(setObject(item.track))
                                setPanelState(!panelState);
                            }}                                
                                className='track-box'>
                                <img src={item.track?.album?.images[0].url}/>
                                <p className='track-text' style={{textAlign: 'left'}}>{item.track?.name}</p>
                                <p className='track-subtext'> {item.track?.artists[0].name}</p>
                            </div>
                        )
                    })
                }     
            </div>          
        </div>
    )
 
}

export default Tracks;