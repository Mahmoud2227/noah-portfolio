import {useRef, useEffect} from "react";
import {createPortal} from "react-dom";
import Visualizer from "./BubbleVisualizer";

const BubbleVisualizer = ({classes, analyser,options}) => {
	const canvas = useRef(null);
	const growLayer = useRef(null);

	useEffect(() => {
		let visualizer;
		if (canvas && growLayer && analyser) {
			visualizer = new Visualizer(canvas.current, growLayer.current, analyser, options);
		}
		return () => visualizer?.cancelAnimation();
	}, [canvas, growLayer, analyser, options]);
	return createPortal(
		<>
			<canvas id={classes.canvas} ref={canvas} />
			<canvas id={classes["glow-layer"]} ref={growLayer} />
		</>,
		document.getElementById("__next")
	);
};

export default BubbleVisualizer;
