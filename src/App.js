import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
    <div className = 'wrapper'>
      <div className = "main-title">
        <h1>Social-Scraper</h1>
      </div>
      <p> Please Entry your query param </p>
     Search For: <input id="user-input-value" value = ''/>
      <button id = 'submit-button'>  Submit </button>
    </div>
    );  
  }
}

export default App;
