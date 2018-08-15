import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './css/App.css';
import Results from './Results';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={Search}/>
        <Route path="/search/:searchTerm" component={Results}/>
      </div>
    );
  }
}

export default App;
