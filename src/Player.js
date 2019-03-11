import React, { Component } from 'react';
import './style.css';
import myVideo from './custom/652333414.mp4';

export default class Player extends Component {
	state = {
		playing: false,
		progress: 0,
		mouseDown: false,
		defaultVol: 0.5,
		defaultBack: 0.5,
		duration: 0,
		currentTime: 0
	};

	progressWidth = React.createRef();

	videoRef = React.createRef();

	playPauseVideo = () => {
		if (!this.state.playing) {
			this.setState({
				playing: true
			});
			this.videoRef.current.play();
			// console.log('duration', this.videoRef.current.duration);
			// console.log('duration', this.videoRef.current.currentTime);
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
		if (e.target.name === 'volume') {
			this.setState({
				defaultVol: e.target.value
			});
		} else {
			this.setState({
				defaultBack: e.target.value
			});
		}
	};

	handleProgress = () => {
		const percent = this.videoRef.current.currentTime / this.videoRef.current.duration * 100;
		this.setState({
			progress: percent,
			duration: this.videoRef.current.duration,
			currentTime: this.videoRef.current.currentTime
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
					src={myVideo}
					onClick={this.playPauseVideo}
					type="video/mp4"
					onTimeUpdate={this.handleProgress}
				/>

				<div className="player__controls">
					<div
						className="progress"
						onClick={this.handleSrub}
						onMouseMove={(e) => this.state.mouseDown && this.handleSrub(e)}
						onMouseDown={() => {
							this.setState({ mouseDown: true });
						}}
						onMouseUp={() => {
							this.setState({ mouseDown: false });
						}}
						ref={this.progressWidth}
					>
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
						onChange={this.handleRangeUpdate}
						value={this.state.defaultVol}
					/>
					<input
						type="range"
						name="playbackRate"
						className="player__slider"
						min="0.5"
						max="6"
						step="0.1"
						onChange={this.handleRangeUpdate}
						value={this.state.defaultBack}
					/>
					<button data-skip="-10" className="player__button" onClick={this.skip}>
						« 10s
					</button>
					<button data-skip="25" className="player__button" onClick={this.skip}>
						25s »
					</button>
					<button>{this.state.currentTime % 60}</button>
					<button>{`${parseFloat(this.state.duration / 60, 10).toFixed(2)} Min`}</button>
				</div>
			</div>
		);
	}
}
