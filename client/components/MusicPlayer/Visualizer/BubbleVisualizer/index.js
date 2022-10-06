import {useRef, useEffect} from "react";
import {createPortal} from "react-dom";
import Visualizer from "./BubbleVisualizer";

const BubbleVisualizer = ({audio, classes}) => {
	const canvas = useRef(null);
	const growLayer = useRef(null);

	useEffect(() => {
		let visualizer;
		if (audio && canvas && growLayer) {
			visualizer = new Visualizer(canvas.current, growLayer.current, audio);
		}
		return () => (visualizer = null);
	}, [audio, canvas, growLayer]);
	return createPortal(
		<>
			<canvas id={classes.canvas} ref={canvas} />
			<canvas id={classes["glow-layer"]} ref={growLayer} />
		</>,
		document.getElementById("__next")
	);
};

export default BubbleVisualizer;
