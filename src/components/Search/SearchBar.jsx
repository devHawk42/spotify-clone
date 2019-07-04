import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
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
      <form onSubmit={this.handleSubmit}>
        <label>
          <input className="search-input" type="text" placeholder="Start typing..." value={this.state.value} onChange={this.handleChange} />
        </label>
        <input className="search-submit" type="submit" value="Submit" />
      </form>
    );
  }
}

export default SearchBar;
