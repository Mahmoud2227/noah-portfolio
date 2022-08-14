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
	type
}) => {
	return (
		<div className={classes.body}>
			{type === 'album' && <TiArrowLoop onClick={onLoop} className={ `${classes.loop} ${looped ? classes.active : ""}`} />}
			<FaStepBackward className={classes.backward}  onClick={onPrevious} />
			{isPlaying ? <FaPause onClick={onPause} className={classes.pause} /> : <FaPlay className={classes.play} onClick={onPlay} />}
			<FaStepForward onClick={onNext} className={classes.forward} />
			{type === 'album' && <TiArrowShuffle onClick={onShuffle} className={`${classes.shuffle} ${shuffled ? classes.active : ""}`} />}
		</div>
	);
};

export default ControlBox;
