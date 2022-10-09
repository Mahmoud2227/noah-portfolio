import {useRef, useEffect} from "react";
import {createPortal} from "react-dom";
import Visualizer from "./SpectrumVisualizer";

const SpectrumVisualizer = ({classes, analyser}) => {
	const canvas = useRef(null);
	let requestIdRef = useRef(null);

	useEffect(() => {
		let visualizer;
		if (canvas && analyser) {
			visualizer = new Visualizer(canvas.current, analyser, requestIdRef);
			requestIdRef.current = requestAnimationFrame(visualizer.update.bind(visualizer));
		}
		return () => {
			cancelAnimationFrame(requestIdRef.current);
		};
	}, [canvas, analyser]);
	return createPortal(
		<canvas id={classes.canvas} ref={canvas} />,
		document.getElementById("__next")
	);
};

export default SpectrumVisualizer;
