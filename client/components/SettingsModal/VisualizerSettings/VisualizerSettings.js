import {RiBubbleChartFill, RiBarChart2Fill, RiBarChartGroupedFill} from "react-icons/ri";

import {useDispatch, useSelector} from "react-redux";
import {setVisualizer} from "../../../redux/features/settingsSlice";

import classes from "./visualizerSettings.module.scss";

const VisualizerOptions = {
	bubbles: [
		{
			name: "wave",
			type: "checkbox",
			label: "Wave",
			default: true,
		},
	],
	bars: [
		{
			name: "barSize",
			type: "range",
			label: "Bar Size",
			min: 1,
			max: 100,
			default: 50,
		},
	],
	spectrum: [
		{
			name: "backlight",
			type: "checkbox",
			label: "Backlight",
			default: true,
		},
		{
			name: "bars",
			type: "checkbox",
			label: "Bars",
			default: true,
		},
		{
			name: "particles",
			type: "checkbox",
			label: "Particles",
			default: true,
		},
		{
			name: "glow",
			type: "checkbox",
			label: "Glow",
			default: true,
		},
	],
};

const VisualizerSettings = () => {
	const settings = useSelector((state) => state.settings.visualizer);
	const dispatch = useDispatch();

	const onVisualizerTypeChange = (e) => {
		const type = e.target.value;
		const options = {};
		VisualizerOptions[type].forEach((option) => {
			options[option.name] = option.default;
		});
		dispatch(setVisualizer({type, options}));
	};

	return (
		<div className={classes["visualizer_options"]}>
			<h2>Visualizer</h2>
			<form>
				<div className={classes.types}>
					<input
						type='radio'
						id='bubbles'
						name='visualizer'
						value='bubbles'
						onChange={onVisualizerTypeChange}
					/>
					<label htmlFor='bubbles'>
						<RiBubbleChartFill />
						Bubbles
					</label>
					<input
						type='radio'
						id='bars'
						name='visualizer'
						value='bars'
						onChange={onVisualizerTypeChange}
					/>
					<label htmlFor='bars'>
						<RiBarChart2Fill />
						Bars
					</label>
					<input
						type='radio'
						id='spectrum'
						name='visualizer'
						value='spectrum'
						defaultChecked
						onChange={onVisualizerTypeChange}
					/>
					<label htmlFor='spectrum'>
						<RiBarChartGroupedFill />
						Spectrum
					</label>
				</div>
				<div className={classes.options}>
					<h3>Options</h3>
					<div className={classes["options-container"]}>
						{VisualizerOptions[settings.type].map((option) => (
							<div className={classes.option} key={option.name}>
								<input
									type={option.type}
									id={option.name}
									name={option.name}
									defaultChecked={option.default}
								/>
								<label htmlFor={option.name}>{option.label}</label>
							</div>
						))}
					</div>
				</div>
			</form>
		</div>
	);
};

export default VisualizerSettings;
