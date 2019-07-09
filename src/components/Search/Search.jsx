import React, { Component } from 'react';
import { Cards, Categories, TopResults } from '../index';
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

  handleSubmit(event) {
    event.preventDefault();
    const request = new Request(`https://api.spotify.com/v1/search?type=album%2Cartist%2Cplaylist%2Ctrack%2Cshow_audio%2Cepisode_audio&q=${this.state.value}&decorate_restrictions=true&best_match=true&include_external=audio&limit=10&userless=false&market=from_token`,
      {
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }),
      });
    fetch(request)
      .then(res => res.json())
      .then((res) => {
        if (!res.error) {
          this.setState({
            topResults: res.best_match.items,
            artists: res.artists.items,
            songs: res.tracks.items,
            albums: res.albums.items,
            playlists: res.playlists.items,
            episodes: res.episodes.items,
            podcasts: res.shows.items,
          });
        }
      })
      .catch((err) => {
        console.log(err);
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

    return (
      <div className="search-main">
        <div>
          <form onSubmit={this.handleSubmit}>
            <input className="search-input" type="text" placeholder="Start typing..." value={this.state.value} onChange={this.handleChange} />
            <input className="search-submit" type="submit" value="Submit" />
          </form>
        </div>
        <div className="content-spacing">
          <Categories selected={this.state.selectedCategorie} categories={categoriesList} />

          <TopResults artist={this.state.artists[0]} />

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

          {/* <Cards title="Episodes" data={this.state.episodes} /> */}
        </div>

      </div>
    );
  }
}

export default Search;
