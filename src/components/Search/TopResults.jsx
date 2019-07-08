import React from 'react';
import { SingleArtist } from '../index';
import PropTypes from 'prop-types';

const TopResults = ({ artist }) => (
  <div className="top-results-container">
    <div className="top-results-img-container">
      <SingleArtist
        id={artist.id}
        name={artist.name}
        url={(artist.images[0]) ? artist.images[0].url : 'https://i.scdn.co/image/2162dbfb7151c96801bf586475cb203c40a21910)'}
        type={artist.type}
      />
    </div>
    <div className="top-results-list-container">
      
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
