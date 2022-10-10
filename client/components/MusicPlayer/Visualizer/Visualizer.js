import {useEffect, memo} from "react";

import {useSelector} from "react-redux";

import BubbleVisualizer from "./BubbleVisualizer";
import SpectrumVisualizer from "./SpectrumVisualizer";

import classes from "./visualizer.module.scss";

let source, context, analyser, gainNode;

const Visualizer = ({audio}) => {
	const settings = useSelector((state) => state.settings.visualizer);

	useEffect(() => {
		if (audio) {
			context = context || new AudioContext();
			source = source || context.createMediaElementSource(audio);
			analyser = analyser || context.createAnalyser();
			gainNode = gainNode || context.createGain();
			source.connect(gainNode);
			gainNode.connect(analyser);
			analyser.connect(context.destination);
			gainNode.gain.value = audio.volume;
		}
	}, [audio]);

	return (
		<>
			{settings.type === "bubbles" && (
				<BubbleVisualizer
					audio={audio}
					classes={classes}
					analyser={analyser}
					options={settings.options}
				/>
			)}
			{settings.type === "spectrum" && (
				<SpectrumVisualizer
					audio={audio}
					classes={classes}
					analyser={analyser}
					options={settings.options}
				/>
			)}
		</>
	);
};

export default Visualizer;
