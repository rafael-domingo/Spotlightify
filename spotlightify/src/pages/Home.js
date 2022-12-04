import React from 'react';
import QuickStart from '../components/QuickStart';
import RecentlyPlayed from '../components/RecentlyPlayed';
import Recommendations from '../components/Recommendations';
import FeaturedPlaylists from '../components/FeaturedPlaylists';

function Home() {

    return (
        <>
            <QuickStart />
            <RecentlyPlayed />
            <Recommendations />
            <FeaturedPlaylists />
        </>
    )
}

export default Home;