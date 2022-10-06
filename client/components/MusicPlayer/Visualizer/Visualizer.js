import {useRef, useEffect} from "react";
import {createPortal} from "react-dom"
import BubbleVisualizer from "./BubbleVisualizer/BubbleVisualizer";

import classes from "./visualizer.module.scss";

const Visualizer = ({audio}) => {
	const canvas = useRef(null);
	const growLayer = useRef(null);

	useEffect(() => {
		let visualizer;
		if (audio && canvas && growLayer) {
			visualizer = new BubbleVisualizer(canvas.current, growLayer.current, audio);
		}
		return () => (visualizer = null);
	}, [audio,canvas,growLayer]);
	return createPortal(
		<>
			<canvas id={classes.canvas} ref={canvas} />
			<canvas id={classes["glow-layer"]} ref={growLayer} />
		</>,
		document.getElementById("__next")
	);
};

export default Visualizer;
