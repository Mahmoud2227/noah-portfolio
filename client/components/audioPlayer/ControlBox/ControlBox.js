import {FaPlay, FaPause, FaStepForward, FaStepBackward} from "react-icons/fa";
import {TiArrowLoop, TiArrowShuffle} from "react-icons/ti";

import classes from "./controlBox.module.scss";

const ControlBox = ({
	isPlaying,
	looped,
  shuffled,
	onPlay,
	onPause,
	onPrevious,
	onLoop,
	onNext,
	onShuffle,
}) => {
	return (
		<div className={classes.body}>
			<TiArrowLoop onClick={onLoop} className={looped ? classes.active : ""} />
			<FaStepBackward onClick={onPrevious} />
			{isPlaying ? <FaPause onClick={onPause} /> : <FaPlay onClick={onPlay} />}
			<FaStepForward onClick={onNext} />
			<TiArrowShuffle onClick={onShuffle} className={shuffled ? classes.active : ""} />
		</div>
	);
};

export default ControlBox;
