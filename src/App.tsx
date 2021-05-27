import React, {Component} from 'react';
import './css/App.css';
import Header from './Header';
import Score from './Score';
import Renderer from "./Renderer";
import LoadingScreen from './LoadingScreen';
import MenuBar from './MenuBar';
import MailWidget from './MailWidget'

interface AppState {
  score: number;
  opacity: number;
  progress: number;
  radius: number;
  omega: number;
  cameraDist: number;
}

class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      score: 0,
      opacity: 1,
      progress: 0,
      radius: 50, // default 50
      omega: 0.3, // default 0.3
      cameraDist: 70, // default 70
    }
  }

  incrementScore = () => {
    this.setState(prev => { return { score: prev.score + 1 }})
  }

  onProgress = (current: number) => {
    this.setState({ progress: current });
  }

  onLoad = () => {
    const fadeOutDuration = 0.8; // seconds
    const fadeOutInterval = 20; // milliseconds
    setInterval(() => {
      // before setState because state should be read before setting
      if (this.state.opacity <= 0) {
        clearInterval();
      }
      const fadeAmount = fadeOutInterval / (1000*fadeOutDuration);
      this.setState(prev => { return { opacity: Math.max(prev.opacity-fadeAmount, 0) }});
    }, fadeOutInterval);
  }

  render() {
    return (
      <div className="App">
        <LoadingScreen opacity={this.state.opacity} progress={this.state.progress}/>
        <Renderer cameraDist={this.state.cameraDist} radius={this.state.radius} omega={this.state.omega} onScore={this.incrementScore} onProgress={this.onProgress} onLoad={this.onLoad} />
        <Header />
        <MenuBar />
        <Score score={this.state.score}/>
        <MailWidget />
        <div className="scrollSpace" style={{ height: '200vh' }} />
      </div>
    );
  }
}

export default App;
