import React from "react";
import {MdSkipNext, MdSkipPrevious} from "react-icons/md";
import {BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle} from "react-icons/bs";

import classes from "./controls.module.scss";

const Controls = ({
	isPlaying,
	isLoading,
	repeat,
	setRepeat,
	shuffle,
	setShuffle,
	currentSongs,
	handlePlayPause,
	handlePrevSong,
	handleNextSong,
}) => (
	<div className={classes.body}>
		<BsArrowRepeat
			size={20}
			color={repeat ? "red" : "white"}
			onClick={() => setRepeat((prev) => !prev)}
			className={classes.icon}
		/>
		{currentSongs?.length !== 0 && (
			<MdSkipPrevious size={30} color='#FFF' className={classes.icon} onClick={handlePrevSong} />
		)}
		{isLoading ? (
			<p>Loading...</p>
		) : isPlaying ? (
			<BsFillPauseFill size={45} color='#FFF' onClick={handlePlayPause} className={classes.icon} />
		) : (
			<BsFillPlayFill size={45} color='#FFF' onClick={handlePlayPause} className={classes.icon} />
		)}
		{currentSongs?.length !== 0 && (
			<MdSkipNext size={30} color='#FFF' className={classes.icon} onClick={handleNextSong} />
		)}
		<BsShuffle
			size={20}
			color={shuffle ? "red" : "white"}
			onClick={() => setShuffle((prev) => !prev)}
			className={classes.icon}
		/>
	</div>
);

export default Controls;
