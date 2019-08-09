import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SingleArtist.css';

const SingleArtist = ({
  id, type, url, name, artistInfo,
}) => (
  <div key={id} className="single-artist">
    <Link to={`/album/${id}`}>
      <div
        className={(type === 'artist') ? 'artist-image border-radius' : 'artist-image'}
        style={(url) ? { backgroundImage: `url(${url})` } : { backgroundImage: 'url(https://i.scdn.co/image/2162dbfb7151c96801bf586475cb203c40a21910)' }}
      />
    </Link>
    <div className="artist-more-info">
      <Link to={`/artist/${id}`}>{name}</Link>
      <div>{artistInfo}</div>
    </div>
  </div>
);

SingleArtist.defaultProps = {
  id: '',
  type: '',
  url: '',
  name: '',
  artistInfo: '',
};

SingleArtist.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
  name: PropTypes.string,
  artistInfo: PropTypes.string,
};

export default SingleArtist;
