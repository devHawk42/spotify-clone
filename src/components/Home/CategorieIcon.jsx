import React from 'react';
import PropTypes from 'prop-types';
import { SingleArtist } from '../index';
import './CategorieIcon.css';

const CategorieIcon = ({ data }) => (
  <div className="artists-container">
    <div className="artists-header">
      <h1 className="artists-title"><a href="#search" className="artist-link">{data.name}</a></h1>
    </div>
    <div className="artists-wrapper">
      {data.map(artist => (
        <SingleArtist
          key={artist.id}
          id={artist.id}
          name={artist.name}
          url={(artist.images && artist.images[0]) ? artist.images[0].url : 'https://i.scdn.co/image/2162dbfb7151c96801bf586475cb203c40a21910)'}
          type={artist.type}
        />
      ))}
    </div>
  </div>
);

CategorieIcon.defaultProps = {
  data: [],
};

CategorieIcon.propTypes = {
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


export default CategorieIcon;
