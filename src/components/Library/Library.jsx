import React, { Component } from 'react';
import { Categories, Cards } from '../index';
import { makeRequest, endpoints } from '../../utils/requests';
import './Library.css';

class Library extends Component {
  constructor() {
    super();
    this.state = {
      playlists: [],
      selectedCategorie: 'featured',
    };
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    const playlists = await makeRequest(endpoints.playlists(user.id));

    this.setState({ playlists: playlists.items });
  }

  handleClick(section) {
    this.setState({ selectedCategorie: section });
  }

  render() {
    const tabCategories = ['playlists', 'liked songs', 'albums', 'artists'];
    const { selectedCategorie, playlists } = this.state;

    return (
      <div className="main-view">
        <Categories
          categories={tabCategories}
          onClick={e => this.handleClick(e)}
          selected={selectedCategorie}
        />

        {(selectedCategorie === 'playlists') ? (
          <Cards
            title=""
            data={playlists}
            selected={selectedCategorie}
          />
        ) : ''}
      </div>
    );
  }
}

export default Library;
