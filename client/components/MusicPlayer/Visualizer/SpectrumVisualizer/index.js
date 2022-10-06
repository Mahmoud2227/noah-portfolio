import {useRef, useEffect} from "react";
import {createPortal} from "react-dom";
import Visualizer from "./SpectrumVisualizer";

const SpectrumVisualizer = ({audio, classes}) => {
	const canvas = useRef(null);

	useEffect(() => {
		let visualizer;
		if (audio && canvas) {
			visualizer = new Visualizer(canvas.current, audio);
		}
		return () => (visualizer = null);
	}, [audio, canvas]);
	return createPortal(
		<canvas id={classes.canvas} ref={canvas} />,
		document.getElementById("__next")
	);
};

export default SpectrumVisualizer;
