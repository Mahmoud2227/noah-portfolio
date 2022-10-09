import {useRef, useEffect} from "react";
import {createPortal} from "react-dom";
import Visualizer from "./BubbleVisualizer";

const BubbleVisualizer = ({classes, analyser}) => {
	const canvas = useRef(null);
	const growLayer = useRef(null);
	let requestIdRef = useRef(null);

	useEffect(() => {
		let visualizer;
		if (canvas && growLayer && analyser) {
			visualizer = new Visualizer(canvas.current, growLayer.current, analyser, requestIdRef);
			requestIdRef.current = requestAnimationFrame(visualizer.render.bind(visualizer));
		}
		return () => {
			cancelAnimationFrame(requestIdRef.current);
		};
	}, [canvas, growLayer, analyser]);
	return createPortal(
		<>
			<canvas id={classes.canvas} ref={canvas} />
			<canvas id={classes["glow-layer"]} ref={growLayer} />
		</>,
		document.getElementById("__next")
	);
};

export default BubbleVisualizer;
