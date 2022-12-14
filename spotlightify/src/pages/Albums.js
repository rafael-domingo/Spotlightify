import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { setObject, setType } from '../redux/panelSlice';
import { setCurrentPlayback } from '../redux/playbackSlice';
import { FaPlayCircle } from 'react-icons/fa';

function Albums({ panelState, setPanelState }) {
    const userState = useSelector((state => state.user));
    const dispatch = useDispatch();

    return (
        <div className='card-container'>
            <div className='page-header'>
                <h1>Albums</h1>
            </div>
            <div className='track-array'>
                {
                    userState.savedAlbums?.items?.map((item) => {
                        return(                            
                            <div className='card-box'>        
                                <div>
                                    <div
                                        onClick={() => {
                                            console.log(item.album)
                                            dispatch(setCurrentPlayback(item.album))
                                        }}
                                        className='play-button'  
                                        style={{height: '200px', width: '200px'}}
                                        >                                        
                                        <FaPlayCircle style={{ height: '50%', width: '50%' }}/>
                                    </div>
                                    <img src={item?.album?.images[0].url} />                                                                                    
                                </div>
                                <div
                                    onClick={() => {
                                        dispatch(setType('album'))
                                        dispatch(setObject(item))
                                        setPanelState(!panelState)
                                    }}
                                >
                                    <p className='card-text'>{item.album.name}</p>                                                                                  
                                    <p className='card-subtext'>{item.album.artists[0].name}</p>                                                                
                                </div>
                            
                            </div>                                                                     
                        
                        )
                    })
                }    
            </div>           
        </div>
    )    
}

export default Albums;