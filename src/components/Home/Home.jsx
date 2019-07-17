import React, { Component } from 'react';
import { Categories } from '../index';
import { endpoints, makeRequest } from '../../utils/requests';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    this.setState(await makeRequest(endpoints.recentlyPlayed));
  }

  render() {
    const categories = ['featured', 'podcasts', 'charts', 'genres & moods', 'new releases', 'discover'];
    //console.log(this.state);
    return (
      <div className="main-view">
        <Categories categories={categories} />
      </div>
    );
  }
}


export default Home;
