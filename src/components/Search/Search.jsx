import React, { Component } from 'react';
import {
  Cards, Categories, TopResults, ListedItems, Episodes,
} from '../index';
import { makeRequest, endpoints } from '../../utils/requests';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      topResults: [],
      artists: [],
      songs: [],
      albums: [],
      playlists: [],
      episodes: [],
      podcasts: [],
      selectedCategorie: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleEvent);

    if (localStorage.getItem('lastSearch')) {
      this.setState(JSON.parse(localStorage.getItem('lastSearch')));
    }
  }

  componentWillUnmount() {
    localStorage.setItem('lastSearch', JSON.stringify(this.state));
  }

  handleClick(section) {
    this.setState({ selectedCategorie: section });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { value } = this.state;
    const searchResult = await makeRequest(endpoints.search(value));
    this.setState({
      topResults: searchResult.best_match.items,
      artists: searchResult.artists.items,
      songs: searchResult.tracks.items,
      albums: searchResult.albums.items,
      playlists: searchResult.playlists.items,
      episodes: searchResult.episodes.items,
      podcasts: searchResult.shows.items,
    });
  }

  render() {
    const {
      selectedCategorie, songs, episodes, value,
      artists, playlists, podcasts, albums,
    } = this.state;

    const tabCategories = ['top results', 'artists', 'songs', 'albums', 'playlists', 'episodes', 'podcasts'];

    const topSongs = songs.slice(0, 5);
    const topEpisodes = episodes.slice(0, 5);

    return (
      <div className="search-main">
        <div className="search-bar">
          <form onSubmit={this.handleSubmit}>
            <input className="search-input" type="text" placeholder="Start typing..." value={value} onChange={this.handleChange} />
            <input className="search-submit" type="submit" value="Submit" />
          </form>
        </div>
        <div className="content-spacing">
          <Categories
            selected={selectedCategorie}
            onClick={e => this.handleClick(e)}
            categories={tabCategories}
          />

          {(selectedCategorie === 'top results') ? (
            <TopResults
              artist={artists[0]}
              songs={topSongs}
            />
          ) : ''}

          {(selectedCategorie === 'artists' || selectedCategorie === 'top results') ? (
            <Cards
              title="artists"
              data={artists}
              selected={selectedCategorie}
            />
          ) : ''}

          {(selectedCategorie === 'albums' || selectedCategorie === 'top results') ? (
            <Cards
              title="albums"
              data={albums}
              selected={selectedCategorie}
            />
          ) : ''}

          {(selectedCategorie === 'playlists' || selectedCategorie === 'top results') ? (
            <Cards
              title="playlists"
              data={playlists}
              selected={selectedCategorie}
            />
          ) : ''}

          {(selectedCategorie === 'podcasts' || selectedCategorie === 'top results') ? (
            <Cards
              title="podcasts"
              data={podcasts}
              selected={selectedCategorie}
            />
          ) : ''}

          {(selectedCategorie === 'episodes' || selectedCategorie === 'top results') ? (
            <Episodes
              title="episodes"
              episodes={topEpisodes}
              selected={selectedCategorie}
            />
          ) : ''}

          {(selectedCategorie === 'songs') ? (
            <ListedItems
              items={songs}
            />
          ) : ''}
        </div>
      </div>
    );
  }
}

export default Search;
