import {RiBubbleChartFill, RiBarChart2Fill, RiBarChartGroupedFill} from "react-icons/ri";

import {useDispatch} from "react-redux";
import {setVisualizer} from "../../../redux/features/optionsSlice";

import classes from "./visualizerSettings.module.scss";

const VisualizerSettings = () => {
	const dispatch = useDispatch();

	const onVisualizerChange = (e) => {
		dispatch(setVisualizer({type: e.target.value, options: {}}));
	};
	return (
		<div className={classes["visualizer_options"]}>
			<input
				type='radio'
				id='bubbles'
				name='visualizer'
				value='bubbles'
				onChange={onVisualizerChange}
			/>
			<label htmlFor='bubbles'>
				<RiBubbleChartFill />
				Bubbles
			</label>
			<input type='radio' id='bars' name='visualizer' value='bars' onChange={onVisualizerChange} />
			<label htmlFor='bars'>
				<RiBarChart2Fill />
				Bars
			</label>
			<input
				type='radio'
				id='spectrum'
				name='visualizer'
				value='spectrum'
				onChange={onVisualizerChange}
			/>
			<label htmlFor='spectrum'>
				<RiBarChartGroupedFill />
				Spectrum
			</label>
		</div>
	);
};

export default VisualizerSettings;
