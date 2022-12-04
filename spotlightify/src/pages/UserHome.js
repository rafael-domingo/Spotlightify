import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import QuickStart from '../components/QuickStart';

function UserHome() {
    const userState = useSelector((state) => state.user);

    return (
        <div className='user-home'>
            <h1>User Home</h1>
            <QuickStart />
        </div>
    )
    
}

export default UserHome;
