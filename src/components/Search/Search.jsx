import React, { Component } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      artists: [],
      albums: [],
      playlists: [],
      podcasts: [],
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
        this.setState({
          artists: res.artists.items,
          albums: res.albums.items,
          playlists: res.playlists.items,
          podcasts: res.episodes.items,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.artists);
    const a = (this.state.artists[0]) ? this.state.artists : [];

    /* for (let i = 0; i < a.length; i++) {
      console.log(a[i].images);
    } */
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
        <div className="artists-container">
          <div className="artists-header">
            <h1 className="artists-title"><a href="#search" className="artist-link">Artists</a></h1>
          </div>
          <div className="artists-wrapper">
            {a.map(artist => (
              <div className="single-artist">
                <Link to={`/artist/${artist.id}`}>
                  <div
                    className="artist-image border-radius"
                    style={(artist.images[1]) ? { backgroundImage: `url(${artist.images[1].url})` } : { backgroundImage: 'url(https://i.scdn.co/image/2162dbfb7151c96801bf586475cb203c40a21910)' }}
                  />
                </Link>
                <div className="artist-more-info">{artist.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="artists-container">
          <div className="artists-header">
            <h1 className="artists-title"><a href="#search" className="artist-link">Albums</a></h1>
          </div>
          <div className="artists-wrapper">
            {this.state.albums.map(artist => (
              <div className="single-artist">
                <Link to={`/artist/${artist.id}`}>
                  <div
                    className="artist-image"
                    style={(artist.images[1]) ? { backgroundImage: `url(${artist.images[1].url})` } : { backgroundImage: 'url(https://i.scdn.co/image/2162dbfb7151c96801bf586475cb203c40a21910)' }}
                  />
                </Link>
                <div className="artist-more-info">{artist.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
