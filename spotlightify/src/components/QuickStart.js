import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,    
} from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { setObject, setType } from '../redux/panelSlice';

function QuickStart({ panelState, setPanelState }) {
    const userState = useSelector((state) => state.user);
    const [quickStartArray, setQuickStartArray] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const array = [];
        for (let index = 0; index < 3; index++) {
            array.push({
                name: userState.userPlaylists?.items[index].name,
                image: userState.userPlaylists?.items[index].images[0].url,
                obj: userState.userPlaylists?.items[index],
                type: 'playlist'
            })            
        }
        for (let index = 0; index < 3; index++) {
            array.push({
                name: userState.topTracks?.items[index].name,
                image: userState.topTracks?.items[index].album.images[0].url,
                obj: userState.topTracks?.items[index],
                type: 'track'
            })            
        }
        for (let index = 0; index < 3; index++) {
            array.push({
                name: userState.topArtists?.items[index].name,
                image: userState.topArtists?.items[index].images[0].url,
                obj: userState.topArtists?.items[index],
                type: 'artist'
            })            
        }
        setQuickStartArray(array);
    }, [userState])
    return (
    
        <div className='quick-start'>                
            <div className='headline'>
                <h3>Good evening</h3>
            </div>                                    
            <div className='quick-start-array'>   
                
                {
                    quickStartArray.map((item) => {
                        return (
                            <div
                                onClick={() => {
                                    dispatch(setType(item.type))
                                    dispatch(setObject(item.obj))
                                    setPanelState(!panelState)
                                }}
                                key={item.obj?.id}
                                className='quick-start-card'>                                                             
                                <img src={item.image} style={item.type === 'artist' ? { borderRadius: '50%' } : { } } />       
                                <div>
                                    <p className='card-text' style={{ textAlign: 'left' }}>{item.name}</p>                                                                                   
                                    {
                                        item.type === 'track' && (
                                            <p className='card-subtext' style={{ textAlign: 'left', paddingLeft: '10px' }}>{item.obj.artists?.[0]?.name}</p>
                                        )
                                    }
                                </div>
                            </div>                                
                        )
                    })
                }                                       
            </div>
        
        </div>
    
    )
}

export default QuickStart;
