import React, {Component} from 'react';

interface TitleTextProps {
	subtitle: string;
}

class TitleText extends Component<TitleTextProps, {}> {
	render() {
		return (
			<div className="TitleText">
				<h1>React and ThreeJS</h1>
				<p>{this.props.subtitle}</p>
			</div>
		);
	}
}

export default TitleText;