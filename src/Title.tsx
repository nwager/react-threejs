import React, {Component} from 'react';
import './css/Title.css';

interface TitleProps {
	title: string;
	subtitle: string;
}

class Title extends Component<TitleProps, {}> {
	render() {
		return (
			<div className="Title">
				<h1>{this.props.title}</h1>
				<p>{this.props.subtitle}</p>
			</div>
		);
	}
}

export default Title;