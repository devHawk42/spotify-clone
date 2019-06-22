import React from 'react';
import { Footer , Home , Navbar } from './components/index';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

function App() {
    return (
      <Router>
        <div className="container">
          <Navbar />
        
          <Route path='/' exact component={Home} />
          
          <Footer />
        </div>
      </Router>
    );
  }

export default App;