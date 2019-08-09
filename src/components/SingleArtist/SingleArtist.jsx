import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SingleArtist.css';

const SingleArtist = ({
  albumId, artistId, type, url, name, artistInfo,
}) => (
  <div key={albumId} className="single-artist">
    <Link to={`/album/${albumId}`}>
      <div
        className={(type === 'artist') ? 'artist-image border-radius' : 'artist-image'}
        style={(url) ? { backgroundImage: `url(${url})` } : { backgroundImage: 'url(https://i.scdn.co/image/2162dbfb7151c96801bf586475cb203c40a21910)' }}
      />
    </Link>
    <div className="artist-more-info">
      <Link to={`/artist/${artistId}`}>{name}</Link>
      <div>
        {artistInfo.map(artist => (
          <Link to={`/artist/${artist.id}`}>{`${artist.name} `}</Link>
        ))}
      </div>
    </div>
  </div>
);

SingleArtist.defaultProps = {
  id: '',
  type: '',
  url: '',
  name: '',
  artistInfo: [],
};

SingleArtist.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
  name: PropTypes.string,
  artistInfo: PropTypes.arrayOf(),
};

export default SingleArtist;
