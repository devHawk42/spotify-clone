import React from 'react';
import './DevProfile.css';

const DevProfile = () => (
    <div className="profile-container">
        <div className="profile-structure">
            <div className="profile-pic-wrapper"></div>
            <ul className="profile-links-wrapper">
                <li className="profile-link">Website</li>
                <li className="profile-link">Github</li>
                <li className="profile-link">Details</li>
            </ul>
        </div>
    </div>
);

export default DevProfile;