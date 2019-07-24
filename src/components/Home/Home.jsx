import React, { Component } from 'react';
import { Categories, Cards, Genres } from '../index';
import { endpoints, makeRequest } from '../../utils/requests';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      related: {},
      userProfile: {},
      newReleases: [],
      recentlyPlayed: [],
      categories: {},
      selectedCategorie: '',
    };
  }

  async componentDidMount() {
    const userProfile = await makeRequest(endpoints.userProfile);
    const newReleases = await makeRequest(endpoints.newReleases(userProfile.country));
    const recentlyPlayed = await makeRequest(endpoints.recentlyPlayed);
    this.getRecentlyPlayedArtists(recentlyPlayed.items);
    const categories = await makeRequest(endpoints.categories);

    this.setState({
      userProfile,
      newReleases: newReleases.albums,
      categories: categories.categories,
    });
  }

  getRecentlyPlayedArtists(recentlyPlayed) {
    const artistsFiltered = Array.from(new Set(recentlyPlayed.map(a => a.track.artists[0].id)))
      .map(id => recentlyPlayed.find(a => a.track.artists[0].id === id));

    this.setState({ recentlyPlayed: artistsFiltered.map(artist => artist.track) });
    this.getRelatedArtists();
  }

  async getRelatedArtists() {
    const { recentlyPlayed } = this.state;
    const artistSeed = recentlyPlayed[0].artists[0];
    const related = {
      seedId: artistSeed.id,
      seedName: artistSeed.name,
    };
    const rsp = await makeRequest(endpoints.relatedArtists(related.seedId));
    related.artists = rsp.artists;
    this.setState({ related });
  }

  handleClick(section) {
    this.setState({ selectedCategorie: section });
  }

  render() {
    const tabCategories = ['featured', 'podcasts', 'charts', 'genres & moods', 'new releases', 'discover'];
    const {
      selectedCategorie,
      newReleases,
      categories,
      recentlyPlayed,
      related,
    } = this.state;

    return (
      <div className="main-view">
        <Categories
          categories={tabCategories}
          onClick={e => this.handleClick(e)}
          selected={selectedCategorie}
        />

        {(selectedCategorie === 'featured') ? (
          <Cards
            title="Recently played"
            data={recentlyPlayed}
            selected={selectedCategorie}
            type="recentlyPlayed"
          />
        ) : ''}

        {(selectedCategorie === 'featured') ? (
          <Cards
            title={`Related to ${related.seedName}`}
            data={related.artists}
            selected={selectedCategorie}
          />
        ) : ''}

        {(selectedCategorie === 'genres & moods') ? (
          <Genres
            title="genres & moods"
            data={categories.items}
            selected={selectedCategorie}
          />
        ) : ''}

        {(selectedCategorie === 'new releases') ? (
          <Cards
            title="New albums & singles"
            data={newReleases.items}
            selected={selectedCategorie}
          />
        ) : ''}

      </div>
    );
  }
}


export default Home;
