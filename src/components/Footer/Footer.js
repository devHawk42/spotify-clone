import './Footer.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Footer extends Component {
    render() {
        return (
            <div className="now-playing">
                <div className="now-playing-container">
                    <div className="now-playing-left">
                        <div className="cover-art"></div>
                        <div className="track-info">
                            <span>Maps of Non-Existence</span>
                            <span>Thank you scientist</span>
                        </div>
                    </div>
                    <div className="now-playing-center">

                    </div>
                    <div className="now-playing-right">

                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;