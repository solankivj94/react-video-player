import React, { Component } from 'react';
import './style.css';

export default class Player extends Component {
	state = {
		playing: false
	};

	videoRef = React.createRef();

	playVideo = () => {
		if (!this.state.playing) {
			this.setState({ playing: true });
			this.videoRef.current.play();
		} else {
			this.setState({ playing: false });
			this.videoRef.current.pause();
		}
	};

	pauseVideo = () => {
		// You can use the play method as normal on your video ref
	};
	render() {
		return (
			<div className="player">
				<video
					ref={this.videoRef}
					className="player__video viewer"
					src="https://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
					type="video/mp4"
				/>

				<div className="player__controls">
					<div className="progress">
						<div className="progress__filled" />
					</div>
					<button onClick={this.playVideo} className="player__button toggle" title="Toggle Play">
						{!this.state.playing ? '►' : '❚ ❚'}
					</button>
					<input
						type="range"
						name="volume"
						className="player__slider"
						min="0"
						max="1"
						step="0.05"
						// value="1"
					/>
					<input
						type="range"
						name="playbackRate"
						className="player__slider"
						min="0.5"
						max="2"
						step="0.1"
						// value="1"
					/>
					<button data-skip="-10" className="player__button">
						« 10s
					</button>
					<button data-skip="25" className="player__button">
						25s »
					</button>
				</div>
			</div>
		);
	}
}
