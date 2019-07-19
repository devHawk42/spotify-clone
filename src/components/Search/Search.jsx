import React, { Component } from 'react';
import {
  Cards, Categories, TopResults, ListedItems, Episodes
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

    this.handleEvent = this.handleEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleEvent(event) {
    if (event.target.className === 'search-single-item') {
      let target = event.target.innerHTML;
      target = (target === 'topResults') ? '' : target;
      this.setState({
        selectedCategorie: target,
      });
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const searchResult = await makeRequest(endpoints.search(this.state.value));
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
    const categoriesList = [];
    Object.keys(this.state).forEach((key) => {
      const element = this.state[key];
      if (Array.isArray(element) && element.length) {
        categoriesList.push(key);
      }
    });

    const topSongs = this.state.songs.slice(0, 5);
    const topEpisodes = this.state.episodes.slice(0, 5);

    return (
      <div className="search-main">
        <div className="search-bar">
          <form onSubmit={this.handleSubmit}>
            <input className="search-input" type="text" placeholder="Start typing..." value={this.state.value} onChange={this.handleChange} />
            <input className="search-submit" type="submit" value="Submit" />
          </form>
        </div>
        <div className="content-spacing">
          <Categories
            selected={this.state.selectedCategorie}
            categories={categoriesList}
          />

          <TopResults
            artist={this.state.artists[0]}
            songs={topSongs}
            selected={this.state.selectedCategorie}
          />

          <Cards
            title="artists"
            data={this.state.artists}
            selected={this.state.selectedCategorie}
          />

          <Cards
            title="albums"
            data={this.state.albums}
            selected={this.state.selectedCategorie}
          />

          <Cards
            title="playlists"
            data={this.state.playlists}
            selected={this.state.selectedCategorie}
          />

          <Cards
            title="podcasts"
            data={this.state.podcasts}
            selected={this.state.selectedCategorie}
          />

          {
            (this.state.selectedCategorie === 'songs')
              ? <ListedItems items={this.state.songs} />
              : ''
          }

          <Episodes
            title="episodes"
            episodes={topEpisodes}
            selected={this.state.selectedCategorie}
          />
        </div>
      </div>
    );
  }
}

export default Search;
