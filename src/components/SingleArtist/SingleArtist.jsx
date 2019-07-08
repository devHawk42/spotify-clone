import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SingleArtist.css';

const SingleArtist = ({
  id, type, url, name,
}) => (
  <div key={id} className="single-artist">
    <Link to={`/artist/${id}`}>
      <div
        className={(type === 'album') ? 'artist-image' : 'artist-image border-radius '}
        style={(url) ? { backgroundImage: `url(${url})` } : { backgroundImage: 'url(https://i.scdn.co/image/2162dbfb7151c96801bf586475cb203c40a21910)' }}
      />
    </Link>
    <div className="artist-more-info">{name}</div>
  </div>
);

SingleArtist.defaultProps = {
  id: '',
  type: '',
  url: '',
  name: '',
};

SingleArtist.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
  name: PropTypes.string,
};

export default SingleArtist;
