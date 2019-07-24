import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="nav-bar">
    <div className="nav-header">
      <h1>Potify</h1>
    </div>

    <ul>
      <li className="navBar-group">
        <div className="navBar-item active-left-icon">
          <Link to="/" className="navBar-link navBar-link--active">
            <div className="navBar-icon-text-wrapper">
              <object id="svgObject" data="./public/home.svg" type="image/svg+xml">Your browser doesn&apost support SVG</object>
              <span className="navBar-link-text">Home</span>
            </div>
          </Link>
        </div>
      </li>
      <li className="navBar-group">
        <div className="navBar-item active-left-icon">
          <Link to="/search" className="navBar-link">
            <div className="navBar-icon-text-wrapper">
              <object id="svgObject" data="./public/search.svg" type="image/svg+xml">Your browser doesn&apostt support SVG</object>
              <span className="navBar-link-text">Search</span>
            </div>
          </Link>
        </div>
      </li>
      <li className="navBar-group">
        <div className="navBar-item active-left-icon">
          <Link to="/library" className="navBar-link">
            <div className="navBar-icon-text-wrapper">
              <object id="svgObject" data="./public/home.svg" type="image/svg+xml">Your browser doesn't support SVG</object>
              <span className="navBar-link-text">Your library</span>
            </div>
          </Link>
        </div>
      </li>

      {/*  <Link to='/'><li>Home</li></Link>
                    <Link to='/search'><li>Search</li></Link>
                    <Link to='/your-library'><li>Your Library</li></Link> */}
    </ul>


    <div className="recently-played">
      <h2 className="nav-header navBar-group-header">recently played</h2>
      <ul>
        <li className="navBar-group navBar-link-header navBar-item-small">
          <div className="active-left-icon">
            <a className="navBar-link">
              <div className="navBar-text-title">Maps of Non-Existence places</div>
              <span className="navBar-text-description">Album</span>
            </a>
          </div>
        </li>
        <li className="navBar-group navBar-link-header navBar-item-small">
          <div className="active-left-icon">
            <a className="navBar-link">
              <div className="navBar-text-title">Maps of Non-Existence places</div>
              <span className="navBar-text-description">Artist</span>
            </a>
          </div>
        </li>
        <li className="navBar-group navBar-link-header navBar-item-small">
          <div className="active-left-icon">
            <a className="navBar-link">
              <div className="navBar-text-title">Maps of Non-Existence places</div>
              <span className="navBar-text-description">Show</span>
            </a>
          </div>
        </li>
      </ul>
    </div>


    <div className="nav-footer">
      <div className="navBar-item active-left-icon">
        <a className="navBar-link">
          <div className="navBar-icon-text-wrapper">
            <object id="svgObject" data="./public/github-filled.svg" type="image/svg+xml">Your browser doesn't support SVG</object>
            <Link to="/devprofile" className="navBar-link-text">
              Dev Profile
            </Link>
          </div>
        </a>
      </div>
    </div>
  </div>
);

export default Navbar;
