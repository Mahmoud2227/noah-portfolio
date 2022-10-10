import {useRef, useEffect} from "react";
import {createPortal} from "react-dom";
import Visualizer from "./SpectrumVisualizer";

const SpectrumVisualizer = ({classes, analyser, options}) => {
	const canvas = useRef(null);

	useEffect(() => {
		let visualizer;
		if (canvas && analyser) {
			visualizer = new Visualizer(canvas.current, analyser, options);
		}
		return () => visualizer?.cancelAnimation();
	}, [canvas, analyser]);
	return createPortal(
		<canvas id={classes.canvas} ref={canvas} />,
		document.getElementById("__next")
	);
};

export default SpectrumVisualizer;
