import React, {Component} from 'react';
import './css/Title.css';

interface TitleProps {
	subtitle: string;
}

class Title extends Component<TitleProps, {}> {
	render() {
		return (
			<div className="TitleText">
				<h1>React and ThreeJS</h1>
				<p>{this.props.subtitle}</p>
			</div>
		);
	}
}

export default Title;