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
                            <span className="track-info-name ellipsis-one-line">Maps of Non-Existence</span>
                            <span className="track-info-artist ellipsis-one-line">Thank you scientist</span>
                        </div>
                    </div>
                    <div className="now-playing-center">
                        <div className="player-controls">
                            <div className="player-control-buttons">
                                <button className="control-button">BACK</button>
                                <button className="control-button">PLAY</button>
                                <button className="control-button">FORWARD</button>
                            </div>
                            <div className="playback-bar">
                                <div className="playback-bar__progress-time">0:00</div>
                                
                                <div className="progress-bar">
                                    <div className="middle-align progress-bar__bg">
                                        <div className="progress-bar__fg_wrapper">
                                            <div className="progress-bar__fg" style={{'transform':'translateX(-100%);'}}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="playback-bar__progress-time">04:20</div>
                            </div>
                        </div>
                    </div>
                    <div className="now-playing-right">
                        <div>
                            <button>VOLUME</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;