import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import QuickStart from '../components/QuickStart';
import RecentlyPlayed from '../components/RecentlyPlayed';
import Recommendations from '../components/Recommendations';

function UserHome() {
    const userState = useSelector((state) => state.user);

    return (
        <div className='user-home'>
            <h1>User Home</h1>
            <QuickStart />
            <RecentlyPlayed />
            <Recommendations />
        </div>
    )
    
}

export default UserHome;
