import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-container">
            <h1>Welcome to the Help Desk</h1>
            <div className="button-container">
                <Link to='/create-ticket' className="button">Submit a Ticket</Link>
                <Link to='/admin-panel' className="button">Admin Panel</Link>
            </div>
        </div>
    )
}



export default LandingPage;