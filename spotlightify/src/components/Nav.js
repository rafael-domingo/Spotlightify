// use for navigating between 'Home', 'Aritsts', 'Albums', 'Playlists', 'Search'
import React from 'react';


function Nav({isActive, setNavState, view, setView}) {    
    return (
        <div
            className={`nav ${isActive ? 'nav-active' : ''}`}
            onMouseLeave={() => setNavState(false)}
            onMouseEnter={() => setNavState(true)}
        >
            <div className='logo'>
                <h1>Spot<span style={{color: '#1DB954', fontWeight: 'bold'}}>light</span>ify</h1>
            </div>
            <div>
                <p
                    className={`nav-item ${view === 'Home' ? 'selected' : ''}`}
                    onClick={() => {
                        setView('Home')
                        // setNavState(false)
                    }}
                >
                    Home
                </p>
                <p
                    className={`nav-item ${view === 'Playlists' ? 'selected' : ''}`}
                    onClick={() => {
                        setView('Playlists')
                        // setNavState(false)
                    }}
                >
                    Playlists
                </p>
                <p
                    className={`nav-item ${view === 'Artists' ? 'selected' : ''}`}
                    onClick={() => {
                        setView('Artists')
                        // setNavState(false)
                    }}
                >
                    Artists
                </p>
                <p
                    className={`nav-item ${view === 'Albums' ? 'selected' : ''}`}
                    onClick={() => {
                        setView('Albums')
                        // setNavState(false)
                    }}
                >
                    Albums
                </p>
                <p
                    className={`nav-item ${view === 'Tracks' ? 'selected' : ''}`}
                    onClick={() => {
                        setView('Tracks')
                        // setNavState(false)
                    }}
                >
                    Tracks
                </p>
            </div>
            
        </div>
    )
}

export default Nav;