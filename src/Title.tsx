import React, {Component} from 'react';
import './css/Title.css';

class Title extends Component {

	private puns = [
		"Hope this website finds you whale.",
		"Whale hello there.",
		"Welcome, it's been a whale.",
		"Long time no sea.",
		"This is a fun whalepaper.",
		"There's no real porpoise to this page.",
		"Isn't this fin.",
		"Whale, whale, whale, look who's here.",
		"Taylor won gold in the 2021 Cetacea-lympics Gymnastics competition.",
		"No pun here, you've been spared.",
	]
	private subtitle: string;

	constructor(props: any) {
		super(props);
		this.subtitle = this.puns[Math.floor(Math.random()*this.puns.length)];
	}

	render() {
		return (
			<div className="Title">
				<h1>React + ThreeJS</h1>
				<p className="subtitle">{this.subtitle}</p>
			</div>
		);
	}
}

export default Title;