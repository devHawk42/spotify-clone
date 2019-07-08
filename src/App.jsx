import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import {
  Footer, Home, Navbar, DevProfile, Search,
} from './components/index';
import './App.css';

function App() {
  if (!localStorage.getItem('accessToken')) {
    const r = /([^&=]+)/g;
    const accessToken = window.location.hash.match(r)[1];
    localStorage.setItem('accessToken', accessToken);
  }

  return (
    <Router>
      <div className="container">
        <Navbar />

        <Route exact path="/" render={props => <Home {...props} token={localStorage.getItem('accessToken')} />} />
        <Route path="/search" component={Search} />
        <Route path="/devprofile" component={DevProfile} />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
