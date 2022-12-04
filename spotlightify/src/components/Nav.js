// use for navigating between 'Home', 'Aritsts', 'Albums', 'Playlists', 'Search'
import React from 'react';


function Nav({isActive, view, setView}) {    
    return (
        <div className={`nav ${isActive ? 'nav-active' : ''}`}>
            <div className='logo'>
                <h1>Spotlightify</h1>
            </div>
            <div>
                <p
                    className={`nav-item ${view === 'Home' ? 'selected' : ''}`}
                    onClick={() => { setView('Home') }}
                >
                    Home
                </p>
                <p
                    className={`nav-item ${view === 'Playlists' ? 'selected' : ''}`}
                    onClick={() => { setView('Playlists') }}
                >
                    Playlists
                </p>
                <p
                    className={`nav-item ${view === 'Artists' ? 'selected' : ''}`}
                    onClick={() => { setView('Artists') }}
                >
                    Artists
                </p>
                <p
                    className={`nav-item ${view === 'Albums' ? 'selected' : ''}`}
                    onClick={() => { setView('Albums') }}
                >
                    Albums
                </p>
                <p
                    className={`nav-item ${view === 'Tracks' ? 'selected' : ''}`}
                    onClick={() => { setView('Tracks') }}
                >
                    Tracks
                </p>
            </div>
            
        </div>
    )
}

export default Nav;