import React, { Component } from 'react';
import './style.css';

export default class Player extends Component {
	state = {
		playing: false,
		progress: 0
	};

	progressWidth = React.createRef();

	videoRef = React.createRef();

	playPauseVideo = () => {
		if (!this.state.playing) {
			this.setState({ playing: true });
			this.videoRef.current.play();
		} else {
			this.setState({ playing: false });
			this.videoRef.current.pause();
		}
	};

	skip = (e) => {
		this.videoRef.current.currentTime += parseFloat(e.target.dataset.skip);
	};

	handleRangeUpdate = (e) => {
		this.videoRef.current[e.target.name] = e.target.value;
	};

	handleProgress = () => {
		const percent = this.videoRef.current.currentTime / this.videoRef.current.duration * 100;
		this.setState({
			progress: percent
		});
	};

	handleSrub = (e) => {
		e.persist();

		const scrubTime =
			e.nativeEvent.offsetX / this.progressWidth.current.offsetWidth * this.videoRef.current.duration;

		this.videoRef.current.currentTime = scrubTime;
	};

	render() {
		return (
			<div className="player">
				<video
					ref={this.videoRef}
					className="player__video viewer"
					src="https://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
					onClick={this.playPauseVideo}
					type="video/mp4"
					onTimeUpdate={this.handleProgress}
				/>

				<div className="player__controls">
					<div className="progress" onClick={this.handleSrub} ref={this.progressWidth}>
						<div className="progress__filled" style={{ flexBasis: `${this.state.progress}%` }} />
					</div>
					<button onClick={this.playPauseVideo} className="player__button toggle" title="Toggle Play">
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
						onChange={this.handleRangeUpdate}
						// value="1"
					/>
					<button data-skip="-10" className="player__button" onClick={this.skip}>
						« 10s
					</button>
					<button data-skip="25" className="player__button" onClick={this.skip}>
						25s »
					</button>
				</div>
			</div>
		);
	}
}
