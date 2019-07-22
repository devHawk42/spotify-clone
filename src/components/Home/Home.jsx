import React, { Component } from 'react';
import { Categories, Cards, Genres } from '../index';
import { endpoints, makeRequest } from '../../utils/requests';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
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
    const categories = await makeRequest(endpoints.categories);

    this.setState({
      userProfile,
      newReleases: newReleases.albums,
      recentlyPlayed,
      categories: categories.categories,
    });
  }

  handleClick(section) {
    this.setState({ selectedCategorie: section });
  }

  render() {
    const tabCategories = ['featured', 'podcasts', 'charts', 'genres & moods', 'new releases', 'discover'];
    const { selectedCategorie, newReleases, categories } = this.state;
console.log(this.state)
    return (
      <div className="main-view">
        <Categories
          categories={tabCategories}
          onClick={e => this.handleClick(e)}
          selected={selectedCategorie}
        />

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
