import React from 'react';
import PropTypes from 'prop-types';
import { SingleArtist, ListedItems } from '../index';
import './TopResults.css';

const TopResults = ({ artist, songs, selected }) => (
  <div
    className={(!songs.length || (selected !== '')) ? 'hide' : 'top-results-container'}
  >
    <div className="top-results-img-container">
      <SingleArtist
        id={artist.id}
        name={artist.name}
        url={(artist.images) ? artist.images[0].url : 'https://i.scdn.co/image/2162dbfb7151c96801bf586475cb203c40a21910)'}
        type={artist.type}
      />
    </div>
    <ListedItems songs={songs} />
  </div>
);

TopResults.defaultProps = {
  artist: {},
  songs: [],
  selected: '',
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
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      duration_ms: PropTypes.number,
    }),
  ),
  selected: PropTypes.string,
};

export default TopResults;
