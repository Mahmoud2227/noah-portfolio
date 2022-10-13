import {useRef, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import Visualizer from "./SpectrumVisualizer";

const SpectrumVisualizer = ({classes, analyser, options}) => {
	const canvas = useRef(null);
	const [visualizer, setVisualizer] = useState(null);

	useEffect(() => {
		if (!visualizer && canvas && analyser) {
			setVisualizer(new Visualizer(canvas.current, analyser, options));
		}
		return () => visualizer?.cancelAnimation();
	}, [canvas, analyser]);

	useEffect(() => {
		if (options && visualizer) {
			visualizer.setOptions(options);
		}
	}, [options]);

	return createPortal(
		<canvas id={classes.canvas} ref={canvas} />,
		document.getElementById("__next")
	);
};

export default SpectrumVisualizer;
