import React, {Component} from 'react';
import logo from './resources/logo.svg';
import './css/App.css';
import Title from "./Title";
import Renderer from "./Renderer";
import LoadingScreen from './LoadingScreen';

interface AppState {
  score: number;
  loading: boolean;
}

class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      score: 0,
      loading: true
    }
  }

  incrementScore = () => {
    this.setState({ score: this.state.score + 1 })
  }

  onLoad = () => {
    this.setState({ loading: false });
  }

  render() {
    return (
      <div className="App">
        <Renderer cameraDist={70} radius={50} omega={0.3} onScore={this.incrementScore} onLoad={this.onLoad} />
        <Title title="React + ThreeJS" subtitle="Hope this website finds you whale." />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Score: {this.state.score}</p>
          <a href="https://github.com/nwager/react-threejs" target="_blank" rel="noreferrer">Github Repo</a>
        </header>
      <LoadingScreen text="Loading..." loading={this.state.loading}/>
      </div>
    );
  }
}

export default App;
