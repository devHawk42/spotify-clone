import React, { Component } from 'react';
import { Categories, Cards } from '../index';
import { endpoints, makeRequest } from '../../utils/requests';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      recentlyPlayed: [],
      categories: [],
      selected: '',
    };
  }

  async componentDidMount() {
    const result = await makeRequest(endpoints.categories);
    //console.log(result)
    this.setState({
      recentlyPlayed: result,
    });
  }

  handleClick(section) {
    this.setState({ selected: section });
  }

  render() {
    const categories = ['featured', 'podcasts', 'charts', 'genres & moods', 'new releases', 'discover'];
    console.log(this.state.selected);

    return (
      <div className="main-view">
        <Categories
          categories={categories}
          onClick={e => this.handleClick(e)}
          selected={this.state.selected}
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
