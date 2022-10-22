import {useRef, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import Visualizer from "./BubbleVisualizer";

const BubbleVisualizer = ({classes, analyser, options}) => {
	const canvas = useRef(null);
	const growLayer = useRef(null);
	const animationIdRef = useRef(null);
	const [visualizer, setVisualizer] = useState(null);

	useEffect(() => {
		if (!visualizer && canvas && growLayer && analyser) {
			setVisualizer(new Visualizer(canvas.current, growLayer.current, analyser, options, animationIdRef));
		}
		animationIdRef.current = visualizer && requestAnimationFrame(visualizer.render.bind(visualizer));
		return () => cancelAnimationFrame(animationIdRef.current);
	}, [canvas, growLayer, analyser,visualizer]);

	useEffect(() => {
		if (options && visualizer) {
			visualizer.setOptions(options);
		}
	}, [options]);

	return createPortal(
		<>
			<canvas id={classes.canvas} ref={canvas} />
			<canvas id={classes["glow-layer"]} ref={growLayer} />
		</>,
		document.getElementById("__next")
	);
};

export default BubbleVisualizer;
