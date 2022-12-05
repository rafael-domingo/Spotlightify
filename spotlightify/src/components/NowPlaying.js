// now playing window -- slides in from the right
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SpotifyWebPlayer from 'react-spotify-web-playback';

function NowPlaying() {
    const access_token = useSelector((state) => state.user.tokens.access_token);
    const currentPlayback = useSelector((state) => state.playback.currentPlayback);
    const [device_id, setDevice_id] = useState(null);
    const [isPlayingState, setIsPlayingState] = useState(false);
    
    useEffect(() => {
        // update queue when new item is played
        setTimeout(() => {
             fetch('/SpotifyPlayback/queue', {
            method: 'POST',
            body: new URLSearchParams({
                access_token
            })
          
        })
            .then(response => response.json())
            .then(data => console.log(data));
        }, 2000);
       
    }, [currentPlayback])
    

    return (
        <div>
            <div style={{display: 'none'}}>
                <SpotifyWebPlayer
                    token={access_token}
                    autoPlay={false}
                    play={isPlayingState}
                    callback={(state) => {
                        console.log(state)
                        setDevice_id(state.deviceId)
                       
                    }}
                    uris={currentPlayback?.uri ? [currentPlayback?.uri] : []}
                />
            </div>
            <div>
                <button onClick={() => setIsPlayingState(true)}>Play</button>
                <button onClick={() => setIsPlayingState(false)}>Pause</button>
            </div>
        </div>
    )
}

export default NowPlaying;