import {useRef, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import Visualizer from "./SpectrumVisualizer";

const SpectrumVisualizer = ({classes, analyser, options}) => {
	const canvas = useRef(null);
	const animationIdRef = useRef(null);
	const [visualizer, setVisualizer] = useState(null);


	useEffect(() => {
		if (!visualizer && canvas && analyser) {
			setVisualizer(new Visualizer(canvas.current, analyser, options, animationIdRef));
		}
		animationIdRef.current = visualizer && requestAnimationFrame(visualizer.render.bind(visualizer));
		return () => cancelAnimationFrame(animationIdRef.current);
	}, [canvas, analyser,visualizer]);

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
