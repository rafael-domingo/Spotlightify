import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { setObject, setType } from '../redux/panelSlice';

function Albums({ panelState, setPanelState }) {
    const userState = useSelector((state => state.user));
    const dispatch = useDispatch();

    return (
        <div className='card-container'>
            <div className='headline'>
                <h1>Albums</h1>
            </div>
            <div className='card-array' style={{flexWrap: 'wrap', overflowY: 'scroll', height: '100vh'}}>
                {
                    userState.savedAlbums?.items?.map((item) => {
                        return(
                            
                            <div onClick={() => {
                                dispatch(setType('album'))
                                dispatch(setObject(item))
                                setPanelState(!panelState)
                            }} className='card-box'>                               
                                <img src={item?.album?.images[0].url} />                                                                                    
                                <p className='card-text'>{item.album.name}</p>                                                                                  
                                <p className='card-subtext'>{item.album.artists[0].name}</p>                                                                
                            
                            </div>                                                                     
                        
                        )
                    })
                }    
            </div>           
        </div>
    )    
}

export default Albums;