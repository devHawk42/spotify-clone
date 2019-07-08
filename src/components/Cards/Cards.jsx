import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Cards.css';

const Cards = ({ title, data }) => (
  <div style={(!data.length) ? { display: 'none' } : {}} className="artists-container">
    <div className="artists-header">
      <h1 className="artists-title"><a href="#search" className="artist-link">{title}</a></h1>
    </div>
    <div className="artists-wrapper">
      {data.map(artist => (
        <div className="single-artist">
          <Link to={`/artist/${artist.id}`}>
            <div
              className="artist-image border-radius"
              style={(artist.images[0]) ? { backgroundImage: `url(${artist.images[0].url})` } : { backgroundImage: 'url(https://i.scdn.co/image/2162dbfb7151c96801bf586475cb203c40a21910)' }}
            />
          </Link>
          <div className="artist-more-info">{artist.name}</div>
        </div>
      ))}
    </div>
  </div>
);

Cards.defaultProps = {
  title: '',
  data: [],
};

Cards.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
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


export default Cards;
