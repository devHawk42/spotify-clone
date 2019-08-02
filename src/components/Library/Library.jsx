import React, { Component } from 'react';
import { Categories, Cards, ListedItems } from '../index';
import { makeRequest, endpoints } from '../../utils/requests';
import './Library.css';

class Library extends Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      albums: [],
      artists: [],
      playlists: [],
      selectedCategorie: '',
    };
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    const playlists = await makeRequest(endpoints.playlists(user.id));

    this.setState({
      playlists: playlists.items,
      selectedCategorie: 'playlists',
    });
  }

  async getSongs() {
    let tracks = await makeRequest(endpoints.savedTracks);
    tracks = tracks.items;
    tracks = tracks.map(item => item.track);

    this.setState({ tracks });
  }

  async getAlbums() {
    let albums = await makeRequest(endpoints.savedAlbums);
    albums = albums.items;
    albums = albums.map(item => item.album);

    this.setState({ albums });
  }

  async getArtists() {
    let artists = await makeRequest(endpoints.savedArtists);
    artists = artists.artists.items;

    this.setState({ artists });
  }

  async handleClick(section) {
    this.setState({ selectedCategorie: section });
    switch (section) {
      // tabCategories
      case 'liked songs':
        this.getSongs();
        break;
      case 'albums':
        this.getAlbums();
        break;
      default:
        this.getArtists();
        break;
    }
  }

  render() {
    const tabCategories = ['playlists', 'liked songs', 'albums', 'artists'];
    const {
      selectedCategorie, playlists, tracks, albums, artists,
    } = this.state;

    return (
      <div className="main-view">
        <Categories
          categories={tabCategories}
          onClick={e => this.handleClick(e)}
          selected={selectedCategorie}
        />

        <div className="main-container">
          {(selectedCategorie === 'playlists') ? (
            <Cards
              title=""
              data={playlists}
              selected={selectedCategorie}
            />
          ) : ''}

          {(selectedCategorie === 'liked songs') ? (
            <ListedItems
              items={tracks}
            />
          ) : ''}

          {(selectedCategorie === 'albums') ? (
            <Cards
              title=""
              data={albums}
              selected={selectedCategorie}
            />
          ) : ''}

          {(selectedCategorie === 'artists') ? (
            <Cards
              title=""
              data={artists}
              selected={selectedCategorie}
            />
          ) : ''}
        </div>
      </div>
    );
  }
}

export default Library;
