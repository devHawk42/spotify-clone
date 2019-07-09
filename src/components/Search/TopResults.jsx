import React from 'react';
import PropTypes from 'prop-types';
import { SingleArtist } from '../index';
import './TopResults.css';

const TopResults = ({ artist }) => (
  <div className="top-results-container">
    <div className="top-results-img-container">
      <SingleArtist
        id={artist.id}
        name={artist.name}
        url={(artist.images) ? artist.images[0].url : 'https://i.scdn.co/image/2162dbfb7151c96801bf586475cb203c40a21910)'}
        type={artist.type}
      />
    </div>
    <div className="top-results-list-container">
      <ol className="tracklist">
        <li className="tracklist-item">
          <div className="track-icon-container">
            <div className="track-icon" />
          </div>
          <div className="track-description">
            <div className="track-name">Windowpane</div>
            <div className="tracklist-info">
              <span>Opeth</span>
              <span>•</span>
              <span>Damnation</span>
            </div>
          </div>
          <div className="track-duration">
            <span>7:40</span>
          </div>
        </li>
        <li className="tracklist-item">
          <div className="track-icon-container">
            <div className="track-icon" />
          </div>
          <div className="track-description">
            <div className="track-name">Windowpane</div>
            <div className="tracklist-info">
              <span>Opeth</span>
              <span>•</span>
              <span>Damnation</span>
            </div>
          </div>
          <div className="track-duration">
            <span>7:40</span>
          </div>
        </li>
        <li className="tracklist-item">
          <div className="track-icon-container">
            <div className="track-icon" />
          </div>
          <div className="track-description">
            <div className="track-name">Windowpane</div>
            <div className="tracklist-info">
              <span>Opeth</span>
              <span>•</span>
              <span>Damnation</span>
            </div>
          </div>
          <div className="track-duration">
            <span>7:40</span>
          </div>
        </li>
      </ol>
    </div>

  </div>
);

TopResults.defaultProps = {
  artist: {},
};

TopResults.propTypes = {
  artist: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.name,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
        }),
      ),
    }),
  ),
};

export default TopResults;
