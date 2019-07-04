import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const request = new Request(`https://api.spotify.com/v1/search?type=album%2Cartist%2Cplaylist%2Ctrack%2Cshow_audio%2Cepisode_audio&q=${this.state.value}&decorate_restrictions=true&best_match=true&include_external=audio&limit=10&userless=false&market=from_token`,
      {
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem('accesToken')}`,
        }),
      });
    fetch(request)
      .then(res => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="search-main">
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input className="search-input" type="text" placeholder="Start typing..." value={this.state.value} onChange={this.handleChange} />
            </label>
            <input className="search-submit" type="submit" value="Submit" />
          </form>
        </div>
        <nav className="search-categories">
          <ul className="search-categories-wrapper">
            <li className="search-categories-items">
              <div><a href="#search" className="search-single-item search-item-active">top results</a></div>
            </li>
            <li className="search-categories-items">
              <div><a href="#search" className="search-single-item">artists</a></div>
            </li>
            <li className="search-categories-items">
              <div><a href="#search" className="search-single-item">songs</a></div>
            </li>
            <li className="search-categories-items">
              <div><a href="#search" className="search-single-item">albums</a></div>
            </li>
            <li className="search-categories-items">
              <div><a href="#search" className="search-single-item">playlists</a></div>
            </li>
            <li className="search-categories-items">
              <div><a href="#search" className="search-single-item">episodes</a></div>
            </li>
            <li className="search-categories-items">
              <div><a href="#search" className="search-single-item">podcasts</a></div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Search;
