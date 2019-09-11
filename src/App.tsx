import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Footer, Home, Navbar, DevProfile, Search, Library, MainArtist, MainAlbum
} from './components/index';
import { setToken } from './utils/session';
import { endpoints, makeRequest } from './utils/requests';
import './App.css';

function App() {
  async function getUserProfile(){
    const userProfile = await makeRequest(endpoints.userProfile);
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  };

  setToken();
  getUserProfile();

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/devprofile" component={DevProfile} />
          <Route path="/library" component={Library} />
          <Route path="/artist/:id" component={MainArtist} />
          <Route path="/album/:id" component={MainAlbum} />
          <Route path="/" component={Home} />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
