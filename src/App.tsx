import React, {Component} from 'react';
import logo from './resources/logo.svg';
import './css/App.css';
import Title from "./Title";
import Renderer from "./Renderer";

interface AppState {
  score: number;
}

class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      score: 0
    }
  }

  incrementScore = () => {
    this.setState({
      score: this.state.score + 1
    })
  }

  render() {
    return (
      <div className="App">
        <Renderer cameraDist={50} radius={30} omega={0.5} onScore={this.incrementScore} />
        <Title subtitle="Hope this website finds you whale." />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Score: {this.state.score}</p>
          <a href="https://github.com/nwager/react-threejs" target="_blank" rel="noreferrer">Github Repo</a>
        </header>
      </div>
    );
  }
}

export default App;
