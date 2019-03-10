import React, { Component } from 'react';
import Player from './Player';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="App">React Video Player</div>
				<Player />
			</React.Fragment>
		);
	}
}

export default App;
