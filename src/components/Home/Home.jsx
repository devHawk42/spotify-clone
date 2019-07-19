import React, { Component } from 'react';
import { Categories, Cards } from '../index';
import { endpoints, makeRequest } from '../../utils/requests';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      userProfile: {},
      newReleases: [],
      recentlyPlayed: [],
      categories: [],
      selectedCategorie: '',
    };
  }

  async componentDidMount() {
    const userProfile = await makeRequest(endpoints.userProfile);
    const newReleases = await makeRequest(endpoints.newReleases(userProfile.country));
    const recentlyPlayed = await makeRequest(endpoints.recentlyPlayed);

    this.setState({
      userProfile,
      newReleases: newReleases.albums,
      recentlyPlayed,
    });
  }

  handleClick(section) {
    this.setState({ selectedCategorie: section });
  }

  render() {
    const categories = ['featured', 'podcasts', 'charts', 'genres & moods', 'new releases', 'discover'];
    console.log(this.state);

    return (
      <div className="main-view">
        <Categories
          categories={categories}
          onClick={e => this.handleClick(e)}
          selected={this.state.selectedCategorie}
        />

        {/* <Cards
          title="Recently played"
          data={this.state.recentlyPlayed}
          selected={this.state.selectedCategorie}
        /> */}

      </div>
    );
  }
}


export default Home;
