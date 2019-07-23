import React from 'react';
import PropTypes from 'prop-types';
import { SingleArtist } from '../index';
import './RecentlyPlayed.css';

const RecentlyPlayed = ({ title, data, selected }) => (
  <div className={(!data.length || (selected !== title && selected !== '')) ? 'artists-container' : 'artists-container'}>
    <div className="artists-header">
      <h1 className="artists-title"><a href="#search" className="artist-link">{title}</a></h1>
    </div>
    <div className="artists-wrapper">
      {data.map(artist => (
        <SingleArtist
          key={artist.id}
          id={artist.id}
          name={artist.name}
          url={(artist.album.images && artist.album.images[0]) ? artist.album.images[0].url : 'https://i.scdn.co/image/2162dbfb7151c96801bf586475cb203c40a21910)'}
          type={artist.type}
        />
      ))}
    </div>
  </div>
);

RecentlyPlayed.defaultProps = {
  title: '',
  data: [],
  selected: '',
};

RecentlyPlayed.propTypes = {
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


export default RecentlyPlayed;
