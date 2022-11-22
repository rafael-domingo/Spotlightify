import React, {useState, useEffect} from 'react';
import {
    MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const [active, setActive] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setActive(true);
        }, 2000);
    }, [0])
    return (
        <div className={`welcome ${active ? 'active-welcome' : ''}`}>
            <div className='logo-div'>
                <h1 className={`logo ${active ? 'active-logo' : ''}`}>Spotlightify</h1>                                
                <MDBBtn
                    className='login-button'
                    color='none'
                    rounded
                    onClick={() => navigate('/userhome')}
                >
                    Login
                </MDBBtn>
            </div>
            
        </div>
    )
}

export default Welcome;