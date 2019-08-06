import React, { Component } from 'react';
import { Categories, Cards, ListedItems } from '../index';
import './MainArtist.css';
import { makeRequest, endpoints } from '../../utils/requests';

class MainArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: {
        id: '',
        name: '',
        images: [],
        albums: [],
        songs: [],
      },
      relatedArtists: [],
      selectedCategorie: 'overview',
    };
  }

  componentDidMount() {
    this.getArtistData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const newId = nextProps.match.params.id;
      return this.getArtistData(newId);
    }
    return '';
  }

  async getArtistData(newId) {
    const artistID = (newId) ? newId : this.props.match.params.id;
    const { name, images, id } = await makeRequest(endpoints.getArtist(artistID));
    const { items } = await makeRequest(endpoints.artistAlbums(artistID));
    const { tracks } = await makeRequest(endpoints.artistTopTracks(artistID));
    const mainPic = images[0].url;

    this.setState({
      artist: {
        name,
        id,
        images,
        mainPic,
        albums: items,
        songs: tracks,
      },
    });

    this.getRelatedArtists();
  }

  async getRelatedArtists() {
    const { artist } = this.state;
    const { artists } = await makeRequest(endpoints.relatedArtists(artist.id));

    this.setState({ relatedArtists: artists });
  }

  handleClick(section) {
    this.setState({ selectedCategorie: section });

    switch (section) {
      case 'related artists':
        this.getRelatedArtists();
        break;
      default:
        break;
    }
  }

  render() {
    const tabCategories = ['overview', 'related artists', 'about'];
    const {
      selectedCategorie, artist, relatedArtists,
    } = this.state;

    const topSongs = artist.songs.slice(0, 5);

    return (
      <div className="main-artist">
        <div className="main-artists-header" style={{ backgroundImage: `url(${artist.mainPic})` }}>
          <div className="header-listeners">
            <p>600,000 monthly listeners</p>
          </div>
          <div className="header-title-container">
            <h1 className="header-title">{artist.name}</h1>
          </div>
          <div className="header-buttons">
            <button className="btn header-button-play" type="button">play</button>
            <button className="btn header-button-follow" type="button">follow</button>
          </div>

          <Categories
            categories={tabCategories}
            onClick={e => this.handleClick(e)}
            selected={selectedCategorie}
          />

        </div>

        <div className="main-artist-container">
          {(selectedCategorie === 'overview') ? (
            <div>
              <h1 className="overview-title">Popular</h1>
              <ListedItems
                items={topSongs}
              />
            </div>
          ) : ''}

          {(selectedCategorie === 'overview') ? (
            <Cards
              title="Albums"
              data={artist.albums}
              selected={selectedCategorie}
            />
          ) : ''}

          {(selectedCategorie === 'related artists') ? (
            <Cards
              title=""
              data={relatedArtists}
              selected={selectedCategorie}
            />
          ) : ''}
        </div>
      </div>
    );
  }
}


export default MainArtist;
