import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ListedItems.css';

function msToTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}

const ListedItems = ({ items }) => (
  <div className="top-results-list-container">
    <ol className="tracklist">
      {
        items.map(item => (
          <li key={item.id} className="tracklist-item">
            <div className="track-icon-container">
              <div className="track-icon" />
            </div>
            <div className="track-description">
              <div className="track-name">{item.name}</div>
              {(item.type !== 'episode')
                ? (
                  <div className="tracklist-info">
                    <Link to={`/artist/${item.artists[0].id}`} className="track-artist">
                      <span>{item.artists[0].name}</span>
                    </Link>
                    <span className="track-info-separator">•</span>
                    <Link to={`/album/${item.album.name}`} className="track-album">
                      <span>{item.album.name}</span>
                    </Link>
                  </div>
                )
                : (
                  <div className="tracklist-info">
                    {(!item.explicit) ? '' : <span>Explicit</span>}
                    <span>{item.release_date}</span>
                  </div>
                )
              }
            </div>
            <div className="track-duration">
              <span>{msToTime(item.duration_ms)}</span>
            </div>
          </li>
        ))
      }
    </ol>
  </div>
);

ListedItems.defaultProps = {
  items: [],
};

ListedItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      duration_ms: PropTypes.number,
    }),
  ),
};

export default ListedItems;
