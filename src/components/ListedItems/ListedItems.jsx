import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ListedItems.css';

function msToTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}

const ListedItems = ({ songs }) => (
  <div className="top-results-list-container">
    <ol className="tracklist">
      {
        songs.map(song => (
          <li className="tracklist-item">
            <div className="track-icon-container">
              <div className="track-icon" />
            </div>
            <div className="track-description">
              <div className="track-name">{song.name}</div>
              <div className="tracklist-info">
                <Link to={`/artist/${song.artists[0].id}`} className="track-artist">
                  <span>{song.artists[0].name}</span>
                </Link>
                <span className="track-info-separator">•</span>
                <Link to={`/album/${song.album.name}`} className="track-album">
                  <span>{song.album.name}</span>
                </Link>
              </div>
            </div>
            <div className="track-duration">
              <span>{msToTime(song.duration_ms)}</span>
            </div>
          </li>
        ))
      }
    </ol>
  </div>
);

ListedItems.defaultProps = {
  songs: [],
};

ListedItems.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      duration_ms: PropTypes.number,
    }),
  ),
};

export default ListedItems;
