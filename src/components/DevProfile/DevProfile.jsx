import React from 'react';
import './DevProfile.css';

const DevProfile = () => (
  <div className="profile-container">
    <div className="profile-structure">
      <div className="profile-pic-wrapper" />
      <ul className="profile-links-wrapper">
        <li className="profile-link">Website</li>
        <a href="https://github.com/devHawk42/spotify-clone" rel="noopener noreferrer" target="_blank"><li className="profile-link">Github</li></a>
        <li className="profile-link">Details</li>
      </ul>
    </div>
  </div>
);

export default DevProfile;
