import './Navbar.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Navbar extends Component {
    /* constructor(){
        super();
        this.state = {};
    } */
    render() {
        return (
            <div className="nav-bar">
                <div className="nav-header">
                    <h1>Potify</h1>
                </div>
                
                <ul>
                    <li className="navBar-group">
                        <div className="navBar-item active-left-icon">
                            <a className="navBar-link navBar-link--active">
                                <h3>Home</h3>
                            </a>
                        </div>
                    </li>
                    <li className="navBar-group">
                        <div className="navBar-item active-left-icon">
                            <a className="navBar-link">
                                <h3>Search</h3>
                            </a>
                        </div>
                    </li>
                    <li className="navBar-group">
                        <div className="navBar-item active-left-icon">
                            <a className="navBar-link">
                                <h3>Your Library</h3>
                            </a>
                        </div>
                    </li>

                   {/*  <Link to='/'><li>Home</li></Link>
                    <Link to='/search'><li>Search</li></Link>
                    <Link to='/your-library'><li>Your Library</li></Link> */}
                </ul>
                
                
                <div className="recently-played">
                    <h2>recently played</h2>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div className="nav-footer"></div>
            </div>
        );
    }
}

export default Navbar;