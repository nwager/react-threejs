import React, {Component} from 'react';
import logo from './resources/logo.svg';
import './css/App.css';
import Title from "./Title";
import Renderer from "./Renderer";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Renderer />
        <Title subtitle="Subtitle from props" />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>This is some body text.</p>
        </header>
      </div>
    );
  }
}

export default App;
