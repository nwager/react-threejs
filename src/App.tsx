import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TitleText from "./TitleText";

interface AppState {
  id: number;
}

class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      id: 1
    }
  }

  render() {
    return (
      <div className="App">
        <TitleText subtitle="This is a subtitle from props" />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
