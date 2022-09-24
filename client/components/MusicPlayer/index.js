import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {motion} from "framer-motion";

import {nextSong, prevSong, playPause, toggleHidden} from "../../redux/features/playerSlice";
import Controls from "./Controls/Controls";
import Player from "./Player/Player";
import SeekBar from "./SeekBar/SeekBar";
import Track from "./Track/Track";
import VolumeBar from "./VolumeBar/VolumeBar";

import classes from "./musicPlayer.module.scss";
import Toggle from "./Toggle/Toggle";

const playerVariants = {
	hidden: {
		bottom: "-12%",
	},
	visible: {
		bottom: "0%",
	},
};

const MusicPlayer = () => {
	const {
		currentAlbum,
		albumCover,
		activeSong,
		currentSongs,
		currentIndex,
		isActive,
		isPlaying,
		isHidden,
	} = useSelector((state) => state.player);
	const [duration, setDuration] = useState(0);
	const [seekTime, setSeekTime] = useState(0);
	const [appTime, setAppTime] = useState(0);
	const [volume, setVolume] = useState(0.3);
	const [repeat, setRepeat] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (currentSongs.length) dispatch(playPause(true));
	}, [currentIndex]);

	const handlePlayPause = () => {
		if (!isActive) return;

		if (isPlaying) {
			dispatch(playPause(false));
		} else {
			dispatch(playPause(true));
		}
	};

	const handleNextSong = () => {
		dispatch(playPause(false));

		if (!shuffle) {
			dispatch(nextSong((currentIndex + 1) % currentSongs.length));
		} else {
			dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
		}
	};

	const handlePrevSong = () => {
		if (currentIndex === 0) {
			dispatch(prevSong(currentSongs.length - 1));
		} else if (shuffle) {
			dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
		} else {
			dispatch(prevSong(currentIndex - 1));
		}
	};

	return (
		<motion.div
			className={classes.body}
			variants={playerVariants}
			initial='visible'
			animate={isHidden ? "hidden" : "visible"}>
			<Toggle isHidden={isHidden} toggleHidden={() => dispatch(toggleHidden())} />
			<Track
				isPlaying={isPlaying}
				isActive={isActive}
				activeSong={activeSong}
				cover={albumCover}
				albumTitle={currentAlbum}
			/>
			<div className={classes.player}>
				<Controls
					isPlaying={isPlaying}
					isActive={isActive}
					repeat={repeat}
					setRepeat={setRepeat}
					shuffle={shuffle}
					setShuffle={setShuffle}
					currentSongs={currentSongs}
					handlePlayPause={handlePlayPause}
					handlePrevSong={handlePrevSong}
					handleNextSong={handleNextSong}
				/>
				<SeekBar
					value={appTime}
					min='0'
					max={duration}
					onInput={(event) => setSeekTime(event.target.value)}
					setSeekTime={setSeekTime}
					appTime={appTime}
				/>
				<Player
					activeSong={activeSong}
					volume={volume}
					isPlaying={isPlaying}
					seekTime={seekTime}
					repeat={repeat}
					currentIndex={currentIndex}
					onEnded={handleNextSong}
					onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
					onLoadedData={(event) => setDuration(event.target.duration)}
				/>
			</div>
			<VolumeBar
				value={volume}
				min='0'
				max='1'
				onChange={(event) => setVolume(event.target.value)}
				setVolume={setVolume}
			/>
		</motion.div>
	);
};

export default MusicPlayer;
