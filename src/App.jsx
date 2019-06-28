import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Footer, Home, Navbar, DevProfile } from './components/index';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />

        <Route path="/" exact component={Home} />
        <Route path="/devprofile" component={DevProfile} />
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
