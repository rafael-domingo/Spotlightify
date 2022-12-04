import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Nav from '../components/Nav';
import Home from './Home';
import Playlists from './Playlists';

function UserHome() {
    const userState = useSelector((state) => state.user);
    const [navState, setNavState] = useState(false);
    const [view, setView] = useState('Home');

    useEffect(() => {
        setNavState(false);
    }, [view])

    const handleViewChange = () => {

    }

    return (
        <div className='user-home'>
            <h1>User Home</h1>
            <button style={{position: 'absolute', right: '0', top: '0'}} onClick={() => setNavState(!navState)}>Nav</button>
            <Nav isActive={navState} setNavState={setNavState} view={view} setView={setView} />
            {view === 'Home' && (<Home />)}       
            {view === 'Playlists' && (<Playlists/>)}
        </div>
    )
    
}

export default UserHome;
