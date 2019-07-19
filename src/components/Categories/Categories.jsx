import React from 'react';
import PropTypes from 'prop-types';
import './Categories.css';

const Categories = ({ selected, categories }) => (
  <nav style={(!categories.length) ? { display: 'none' } : {}} className="search-categories">
    <ul className="search-categories-wrapper">
      {
        categories.map((categorie, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} className="search-categories-items">
            <div>
              <span
                href=""
                className={(selected === categorie) ? 'search-single-item search-item-active' : 'search-single-item'}
              >
                {categorie}
              </span>
            </div>
          </li>
        ))
      }
    </ul>
  </nav>
);

Categories.defaultProps = {
  selected: '',
  categories: [],
};

Categories.propTypes = {
  selected: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
};

export default Categories;
