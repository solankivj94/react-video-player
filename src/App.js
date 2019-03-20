import React, { Component } from 'react';
import Player from './Player';
import myVideo from './custom/652333414.mp4';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Player videoSrc={myVideo} />
			</React.Fragment>
		);
	}
}

export default App;
