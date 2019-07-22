import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Genres.css';

const Genres = ({ data, selected, title }) => (
  <div className={(!data.length || (selected !== title && selected !== '')) ? 'artists-container' : 'artists-container'}>
    <div className="artists-header">
      <h1 className="artists-title"><a href="#search" className="artist-link">{title}</a></h1>
    </div>
    <div className="artists-wrapper">
      {data.map(item => (
        <div key={item.id} className="single-artist">
          <Link to={`/categories/${item.id}`}>
            <div
              className="artist-image"
              style={(item.icons[0]) ? { backgroundImage: `url(${item.icons[0].url})` } : { backgroundImage: 'url(https://i.scdn.co/image/2162dbfb7151c96801bf586475cb203c40a21910)' }}
            />
          </Link>
          <div className="artist-more-info">
            <Link to={`/categories/${item.id}`}>{item.name}</Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

Genres.defaultProps = {
  title: '',
  data: [],
  selected: '',
};

Genres.propTypes = {
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
  selected: PropTypes.string,
};


export default Genres;
