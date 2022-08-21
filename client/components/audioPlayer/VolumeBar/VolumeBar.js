import {IoVolumeHigh, IoVolumeLow, IoVolumeMedium, IoVolumeMute} from "react-icons/io5";


import classes from "./volumeBar.module.scss";

const VolumeBar = ({value,onChange}) => {
	const volumeIcon =
		value <= 0.01
			? <IoVolumeMute/>
			: value <= 0.5
			? <IoVolumeLow/>
			: value <= 0.8
			? <IoVolumeMedium/>
			: <IoVolumeHigh/>;
	return (
		<div className={classes.body}>
			{volumeIcon}
			{/* <label title='Audio Player Volume Bar' /> */}
			<input
				type='range'
				title='Audio Player Volume Bar'
				min='1'
				max='100'
				step='1'
				defaultValue='80'
				className={classes.slider}
				onChange={onChange}
				style={{
					background: `linear-gradient(90deg, #ffffff ${value * 100}%, #151616 ${value * 100}%)`,
				}}
			/>
		</div>
	);
};

export default VolumeBar;