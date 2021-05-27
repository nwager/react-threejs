import React, {Component} from 'react';
import './css/MenuBar.css';
import reactLogo from './resources/react.svg';
import githubLogo from './resources/github.svg';
import threeLogo from './resources/threejs.svg';

class MenuBar extends Component {

	render() {
		return (
			<div className="MenuBar">
				<div className="activate-button"></div>
				<ul className="Links">
					<li className="bar-item">
						<a href="https://reactjs.org/" target="_blank" rel="noreferrer">
							<img src={reactLogo} alt="react logo" />
						</a>
					</li>
					<li className="bar-item">
						<a href="https://threejs.org/" target="_blank" rel="noreferrer">
							<img src={threeLogo} alt="threejs logo" />
						</a>
					</li>
					<li className="bar-item">
						<a href="https://github.com/nwager/react-threejs" target="_blank" rel="noreferrer">
							<img src={githubLogo} alt="github logo" />
						</a>
					</li>
				</ul>
			</div>
		);
	}
}

export default MenuBar;