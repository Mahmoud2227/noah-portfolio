import {useEffect, memo} from "react";

import {useSelector} from "react-redux";

import BubbleVisualizer from "./BubbleVisualizer";
import SpectrumVisualizer from "./SpectrumVisualizer";

import classes from "./visualizer.module.scss";

let source, context, analyser, gainNode, frequencyData;

const Visualizer = ({audio}) => {
	const settings = useSelector((state) => state.settings.visualizer);

	useEffect(() => {
		if (audio) {
			context = context || new AudioContext();
			source = source || context.createMediaElementSource(audio);
			analyser = analyser || context.createAnalyser();
			analyser.smoothingTimeConstant = 0.88;
			analyser.minDecibels = -140;
			analyser.maxDecibels = -10;
			analyser.fftSize = 1024;
			gainNode = gainNode || context.createGain();
			source.connect(gainNode);
			gainNode.connect(analyser);
			analyser.connect(context.destination);
			gainNode.gain.value = audio.volume;
			// frequencyData = new Uint8Array(analyser.frequencyBinCount);
		}
	}, [audio]);

	return (
		<>
			{settings.type === "bubbles" && (
				<BubbleVisualizer
					audio={audio}
					classes={classes}
					source={source}
					context={context}
					analyser={analyser}
					gainNode={gainNode}
				/>
			)}
			{settings.type === "spectrum" && (
				<SpectrumVisualizer
					audio={audio}
					classes={classes}
					source={source}
					context={context}
					analyser={analyser}
					gainNode={gainNode}
				/>
			)}
		</>
	);
};

export default Visualizer;
