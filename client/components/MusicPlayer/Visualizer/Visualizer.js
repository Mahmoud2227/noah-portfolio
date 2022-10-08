import {useSelector} from "react-redux";

import BubbleVisualizer from "./BubbleVisualizer";
import SpectrumVisualizer from "./SpectrumVisualizer";

import classes from "./visualizer.module.scss";

const Visualizer = ({audio}) => {
	const settings = useSelector((state) => state.settings.visualizer);
	return (
		<>
			{settings.type === "bubble" && <BubbleVisualizer audio={audio} classes={classes} />}
			{settings.type === "spectrum" && <SpectrumVisualizer audio={audio} classes={classes} />}
		</>
	);
};

export default Visualizer;
