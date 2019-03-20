import React, { Component } from 'react';
import Player from './Player';
import myVideo from './custom/652333414.mp4';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<h1 className="main-heading">Custom React Video Player</h1>
				<Player videoSrc={myVideo} />
			</React.Fragment>
		);
	}
}

export default App;
