import React from 'react';
import QuickStart from '../components/QuickStart';
import RecentlyPlayed from '../components/RecentlyPlayed';
import Recommendations from '../components/Recommendations';
import FeaturedPlaylists from '../components/FeaturedPlaylists';

function Home({ panelState, setPanelState }) {

    return (
        <>
            <QuickStart panelState={panelState} setPanelState={setPanelState} />
            <RecentlyPlayed panelState={panelState} setPanelState={setPanelState} />
            <Recommendations panelState={panelState} setPanelState={setPanelState}/>
            <FeaturedPlaylists panelState={panelState} setPanelState={setPanelState}/>
        </>
    )
}

export default Home;