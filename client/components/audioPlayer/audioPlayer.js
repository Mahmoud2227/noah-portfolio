import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import ControlBox from "./ControlBox/ControlBox";
import VolumeBar from "./VolumeBar/VolumeBar";

import classes from "./audioPlayer.module.scss";
import Visualizer from "./Visualizer/Visualizer";

const formatLength = (length) => {
	return new Date(1000 * length).toISOString().substring(15, 19);
};

const shufflePlaylist = (arr) => {
	if (arr.length === 1) return arr;
	const rand = Math.floor(Math.random() * arr.length);
	return [arr[rand], ...shufflePlaylist(arr.filter((_, i) => i !== rand))];
};

const AudioPlayer = ({trackList, getActiveTrack, curTrack, setCurTrack, type}) => {
	const [audio, setAudio] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [hasEnded, setHasEnded] = useState(false);
	const [title, setTitle] = useState("");
	const [length, setLength] = useState(0);
	const [time, setTime] = useState(0);
	const [slider, setSlider] = useState(1);
	const [drag, setDrag] = useState(0);
	const [volume, setVolume] = useState(0.8);
	const [shuffled, setShuffled] = useState(false);
	const [looped, setLooped] = useState(type === "single");

	let playlist = trackList;

	useEffect(() => {
		const audio = new Audio(curTrack.url);
		audio.crossOrigin = "anonymous";
		audio.preload = "none";

		const setAudioData = () => {
			setLength(audio.duration);
			setTime(audio.currentTime);
		};

		const setAudioTime = () => {
			const curTime = audio.currentTime;
			setTime(curTime);
			setSlider(curTime ? ((curTime * 100) / audio.duration).toFixed(1) : 0);
		};

		const setAudioVolume = () => setVolume(audio.volume);

		const setAudioEnd = () => setHasEnded(true);

		audio.addEventListener("loadeddata", setAudioData);
		audio.addEventListener("timeupdate", setAudioTime);
		audio.addEventListener("volumechange", setAudioVolume);
		audio.addEventListener("ended", setAudioEnd);

		setAudio(audio);
		setTitle(curTrack.title);

		return () => {
			audio.pause();
		};
	}, []);

	useEffect(() => {
		if (audio != null) {
			audio.src = curTrack.url;
			setTitle(curTrack.title);
			if (getActiveTrack) {
				const index = trackList.findIndex((track) => track._key === curTrack._key);
				getActiveTrack(index);
			}
			onPlayHandler();
		}
	}, [curTrack]);

	useEffect(() => {
		if (audio != null && hasEnded) {
			if (shuffled) {
				playlist = shufflePlaylist(playlist);
			}
			looped ? onPlayHandler() : onNextHandler();
		}
	}, [hasEnded]);

	useEffect(() => {
		if (audio != null) {
			audio.volume = volume;
		}
	}, [volume]);

	useEffect(() => {
		if (audio != null) {
			onPauseHandler();
			audio.currentTime = Math.round((drag * audio.duration) / 100);
		}
	}, [drag]);

	const onLoopHandler = () => {
		setLooped(!looped);
	};

	const onPreviousHandler = () => {
		const index = playlist.findIndex((track) => track._key === curTrack._key);
		if (index !== 0) {
			setCurTrack(playlist[index - 1]);
		} else {
			setCurTrack(playlist[playlist.length - 1]);
		}
	};

	const onPlayHandler = () => {
		setIsPlaying(true);
		setHasEnded(false);
		audio.play();
	};

	const onPauseHandler = () => {
		setIsPlaying(false);
		audio.pause();
	};

	const onNextHandler = () => {
		const index = playlist.findIndex((track) => track._key === curTrack._key);
		if (index !== playlist.length - 1) {
			setCurTrack(playlist[index + 1]);
		} else {
			setCurTrack(playlist[0]);
		}
	};

	const onShuffleHandler = () => {
		setShuffled(!shuffled);
	};

	return (
		<>
			<div className={classes.body}>
				<div className={classes.info}>
					<h3 className={classes.title}>{title}</h3>
					<span className={classes.duration}>
						{`${!time ? "0:00" : formatLength(time)}/${
							!length ? curTrack.duration : formatLength(length)
						}`}
					</span>
				</div>
				<div className={classes["progress-bar"]}>
					{/* <label title='Audio Player Range' /> */}
					<input
						type='range'
						title='Audio Player Range'
						min='1'
						max='100'
						step={audio ? (100 / audio.duration).toString() : "1"}
						value={slider}
						className={classes.slider}
						onChange={(e) => {
							setSlider(e.target.value);
							setDrag(e.target.value);
						}}
						onMouseUp={onPlayHandler}
						onTouchEnd={onPlayHandler}
						style={{
							background: `linear-gradient(90deg, #ffffff ${Math.floor(
								slider
							)}%, #151616 ${Math.floor(slider)}%)`,
						}}
					/>
				</div>
				<div className={classes.controls}>
					<ControlBox
						onLoop={onLoopHandler}
						onPrevious={onPreviousHandler}
						onPlay={onPlayHandler}
						onPause={onPauseHandler}
						onNext={onNextHandler}
						onShuffle={onShuffleHandler}
						isPlaying={isPlaying}
						looped={looped}
						shuffled={shuffled}
						type={type}
					/>
					<VolumeBar
						value={volume}
						onChange={(e) => {
							setVolume(e.target.value / 100);
						}}
					/>
				</div>
			</div>
			{<Visualizer audio={audio} curTrack={curTrack} isPlaying={isPlaying} />}
		</>
	);
};

export default AudioPlayer;
