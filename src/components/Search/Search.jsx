import React, { Component } from 'react';
import { Cards, Categories } from '../index';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      topResult: [],
      artists: [],
      albums: [],
      playlists: [],
      podcasts: [],
      songs: [],
      episodes: [],
      selectedCategorie: '',
    };

    this.handleEvent = this.handleEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleEvent);
console.log("component did mount")
    if (localStorage.getItem('lastSearch')) {
      this.setState(JSON.parse(localStorage.getItem('lastSearch')));
    }
  }

  handleEvent(event) {
    if (event.target.className === 'search-single-item') {
      this.setState({
        selectedCategorie: event.target.innerHTML,
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
          const searchResponse = {
            artists: res.artists.items,
            albums: res.albums.items,
            playlists: res.playlists.items,
            podcasts: res.shows.items,
            songs: res.tracks.items,
            episodes: res.episodes.items,
            bestMatch: res.best_match.items,
          };
          this.setState(searchResponse);
          
          searchResponse.value = this.state.value;
          localStorage.setItem('lastSearch', JSON.stringify(searchResponse));
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

        <Categories selected={this.state.selectedCategorie} categories={categoriesList} />

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
    );
  }
}

export default Search;
