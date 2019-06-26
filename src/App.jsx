import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Footer, Home, Navbar } from './components/index';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />

        <Route path="/" exact component={Home} />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
