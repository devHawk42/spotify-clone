import React from 'react';
import PropTypes from 'prop-types';
import { ListedItems } from '../index';
import './Episodes.css';

const Episodes = ({ title, episodes }) => (
  <div className="artists-container" >
    <div className="artists-header">
      <h1 className="artists-title"><a href="#search" className="artist-link">{title}</a></h1>
    </div>
    <ListedItems items={episodes} />
  </div>
);

Episodes.defaultProps = {
  title: '',
  episodes: [],
};

Episodes.propTypes = {
  title: PropTypes.string,
  episodes: PropTypes.arrayOf(
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


export default Episodes;
