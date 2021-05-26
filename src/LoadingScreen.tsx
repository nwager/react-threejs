import React, {Component} from 'react';
import './css/LoadingScreen.css';

interface LoadingScreenProps {
	text: string;
	loading: boolean;
}

class LoadingScreen extends Component<LoadingScreenProps, {}> {
	render() {
		return (
			<div className={`LoadingScreen ${this.props.loading ? "" : "DoneLoading"}`}>
				<h1>{this.props.text}</h1>
			</div>
		);
	}
}

export default LoadingScreen;