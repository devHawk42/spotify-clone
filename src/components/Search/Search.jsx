import React, { Component } from 'react';
import SearchBar from './SearchBar.jsx';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

  }

  render() {
    return (
      <div className="search-main">
        <SearchBar />
      </div>
    );
  }
}

export default Search;
