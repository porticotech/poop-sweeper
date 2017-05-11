import React, { Component } from 'react';
import './App.css';

import Game from './components/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="App-logo">💩</div>
          <h2>Poop Sweeper</h2>
        </div>
        <Game />
      </div>
    );
  }
}

export default App;
