import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ParserForm from './ParserForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Korean Translation Parser</h1>
        </header>
        <div style={{width: '70%', margin: '0 auto'}}>
          <ParserForm/>
        </div>
      </div>
    );
  }
}

export default App;
