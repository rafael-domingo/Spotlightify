import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Nav from '../components/Nav';
import Artists from './Artists';
import Home from './Home';
import Playlists from './Playlists';
import Albums from './Albums';
import Tracks from './Tracks';
import NowPlaying from '../components/NowPlaying';
import Panel from '../components/Panel';



function UserHome() {
    const userState = useSelector((state) => state.user);
    const access_token = useSelector((state) => state.user.tokens.access_token)
    const [navState, setNavState] = useState(false);
    const [panelState, setPanelState] = useState(false);
    const [view, setView] = useState('Home');
    const [navArea, setNavArea] = useState(false);
    
    useEffect(() => {
        if (navState || panelState) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'scroll';
        }
        if (navState) {
            setNavArea(false);
        }
    }, [navState, panelState])

    
    const handleViewChange = () => {

    }

    return (
        <div className='user-home'>                                  
            <Nav isActive={navState} setNavState={setNavState} view={view} setView={setView} />
            <Panel isActive={panelState} setPanelState={setPanelState} />
            <NowPlaying />
            <div className={`container ${navState ? 'container-inactive-right' : ''} ${panelState ? 'container-inactive-left' : ''}`}>                                                         
                {view === 'Home' && (<Home panelState={panelState} setPanelState={setPanelState}/>)}       
                {view === 'Playlists' && (<Playlists panelState={panelState} setPanelState={setPanelState} />)}
                {view === 'Artists' && (<Artists panelState={panelState} setPanelState={setPanelState}/>)}
                {view === 'Albums' && (<Albums panelState={panelState} setPanelState={setPanelState}/>)}
                {view === 'Tracks' && (<Tracks panelState={panelState} setPanelState={setPanelState} />)}
            
            </div>
         
        </div>
    )
    
}

export default UserHome;
