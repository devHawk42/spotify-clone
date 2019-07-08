import React from 'react';
import PropTypes from 'prop-types';
import { SingleArtist } from '../index';
import './Cards.css';

const Cards = ({ title, data, selected }) => (
  <div className={(!data.length || (selected !== title && selected !== '')) ? 'hide artists-container' : 'artists-container'}>
    <div className="artists-header">
      <h1 className="artists-title"><a href="#search" className="artist-link">{title}</a></h1>
    </div>
    <div className="artists-wrapper">
      {data.map(artist => (
        <SingleArtist
          id={artist.id}
          name={artist.name}
          url={(artist.images[0]) ? artist.images[0].url : 'https://i.scdn.co/image/2162dbfb7151c96801bf586475cb203c40a21910)'}
          type={artist.type}
        />
      ))}
    </div>
  </div>
);

Cards.defaultProps = {
  title: '',
  data: [],
  selected: '',
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
  selected: PropTypes.string,
};


export default Cards;
