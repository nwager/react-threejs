import React, {Component} from 'react';
import './css/Score.css';

interface ScoreProps {
	score: number;
}

class Score extends Component<ScoreProps> {

	render() {
		return (
			<div className="Score">
				<p className="scoreText">Score: {this.props.score}</p>
			</div>
		);
	}
}

export default Score;