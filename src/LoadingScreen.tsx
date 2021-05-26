import React, {Component} from 'react';
import './css/LoadingScreen.css';

interface LoadingScreenProps {
	opacity: number;
	progress: number;
}

class LoadingScreen extends Component<LoadingScreenProps> {
	render() {
		return this.props.opacity > 0 ? (
			<div className="LoadingScreen" style={{opacity: this.props.opacity}}>
				<h1 className="loadingText">Loading</h1>
				<div className="progressParent">
					<div className="progressBar" style={{ width: `${this.props.progress*100}%` }}></div>
				</div>
			</div>
		) : null;
	}
}

export default LoadingScreen;