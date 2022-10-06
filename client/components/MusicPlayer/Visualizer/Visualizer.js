import BubbleVisualizer from "./BubbleVisualizer";
import SpectrumVisualizer from "./SpectrumVisualizer";

import classes from "./visualizer.module.scss";

const Visualizer = ({audio}) => {
	return <>
		{/* <BubbleVisualizer audio={audio} classes={classes} /> */}
		<SpectrumVisualizer audio={audio} classes={classes} />
	</>
};

export default Visualizer;
