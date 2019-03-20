import React, { Component } from 'react';

import { IoMdPlay, IoMdPause, IoMdSkipBackward, IoMdSkipForward, IoMdQrScanner, IoMdVolumeHigh } from 'react-icons/io';

import './style.css';

export default class Player extends Component {
	state = {
		playing: false,
		progress: 0,
		mouseDown: false,
		defaultVol: 0.5,
		defaultBack: 0.5,
		durationTime: 0,
		currentTime: 0,
		bufferLoad: 0
	};

	progressWidth = React.createRef();

	videoRef = React.createRef();

	playPauseVideo = () => {
		if (!this.state.playing) {
			this.setState({
				playing: true
			});
			this.videoRef.current.play();
		} else {
			this.setState({ playing: false });
			this.videoRef.current.pause();
		}
	};

	skip = (e) => {
		this.videoRef.current.currentTime += parseFloat(e.currentTarget.dataset.skip);
		// console.log(this.videoRef.current.currentTime);
		// console.log(parseFloat(e.currentTarget.dataset.skip));
	};

	buffering = (e) => {
		e.persist();
		var range = 0;
		var bf = this.videoRef.current.buffered;
		var time = this.videoRef.current.currentTime;
		// console.log('start', bf.start(range));
		// console.log('end', bf.end(range));
		// console.log('time', time);
		// console.log('ready', this.videoRef.current.readyState);
		while (!(bf.start(range) <= time && time <= bf.end(range))) {
			range += 1;
		}
		var loadStartPercentage = bf.start(range) / this.videoRef.current.duration;
		var loadEndPercentage = bf.end(range) / this.videoRef.current.duration;
		var loadPercentage = loadEndPercentage - loadStartPercentage;

		this.setState({
			bufferLoad: loadPercentage * 100
		});
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

		let durMin = Math.floor(this.videoRef.current.duration / 60);
		let durSec = Math.floor(this.videoRef.current.duration - durMin * 60);
		let currentMin = Math.floor(this.videoRef.current.currentTime / 60);
		let currentSec = Math.floor(this.videoRef.current.currentTime - currentMin * 60);

		if (currentSec < 10) {
			currentSec = '0' + currentSec;
		}
		if (durSec < 10) {
			durSec = '0' + durSec;
		}
		if (currentMin < 10) {
			currentMin = '0' + currentMin;
		}
		if (durMin < 10) {
			durMin = '0' + durMin;
		}

		this.setState({
			progress: percent,
			durationTime: `${durMin}:${durSec}`,
			currentTime: `${currentMin}:${currentSec}`
		});
	};

	handleSrub = (e) => {
		e.persist();

		const scrubTime =
			e.nativeEvent.offsetX / this.progressWidth.current.offsetWidth * this.videoRef.current.duration;

		this.videoRef.current.currentTime = scrubTime;
		console.log('scrub', scrubTime / this.videoRef.current.duration * 100);

		// this.setState({
		// 	bufferLoad: scrubTime / this.videoRef.current.duration * 100
		// });
	};

	fullScreenButton = () => {
		if (this.videoRef.current.requestFullscreen) {
			this.videoRef.current.requestFullscreen();
		} else if (this.videoRef.current.mozRequestFullScreen) {
			this.videoRef.current.mozRequestFullScreen(); // Firefox
		} else if (this.videoRef.current.webkitRequestFullscreen) {
			this.videoRef.current.webkitRequestFullscreen(); // Chrome and Safari
		}
	};

	render() {
		return (
			<div className="player">
				<video
					ref={this.videoRef}
					className="player__video viewer"
					src={this.props.videoSrc}
					onClick={this.playPauseVideo}
					type="video/mp4"
					onTimeUpdate={this.handleProgress}
					// onProgress={this.buffering}
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
						{/* <div className="progress__buffered" style={{ width: `${this.state.bufferLoad}%` }} /> */}
					</div>

					{/* <input
						type="range"
						name="playbackRate"
						className="player__slider"
						min="0.5"
						max="6"
						step="0.1"
						onChange={this.handleRangeUpdate}
						value={this.state.defaultBack}
					/> */}

					<div className="main-nav">
						<div className="volume">
							<IoMdVolumeHigh className="volume-ani" />
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
						</div>
						<div className="center-button">
							<p className="time">{this.state.currentTime}</p>
							<button data-skip="-10" className="player__button rewind-btn" onClick={this.skip}>
								<IoMdSkipBackward />
							</button>

							<button
								onClick={this.playPauseVideo}
								className="player__button toggle playpausebutton"
								title="Toggle Play"
							>
								{!this.state.playing ? <IoMdPlay /> : <IoMdPause />}
							</button>
							<button data-skip="25" className="player__button rewind-btn" onClick={this.skip}>
								<IoMdSkipForward />
							</button>

							<p className="time">{this.state.durationTime}</p>
						</div>
						<div className="fullscreen">
							<button onClick={this.fullScreenButton}>
								<IoMdQrScanner />
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
