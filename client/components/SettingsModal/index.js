import React from "react";
import {useSelector} from "react-redux";
import {motion, AnimatePresence} from "framer-motion";

import VisualizerOptions from "./VisualizerSettings/VisualizerSettings";
import ToggleBtn from "./ToggleBtn/ToggleBtn";

import classes from "./settingsModal.module.scss";

const settingsModal = () => {
	const isHidden = useSelector((state) => state.settings.isHidden);
	return (
		<>
			<ToggleBtn />
			<AnimatePresence>
				{!isHidden && (
					<motion.div
						className={classes.body}
						initial={{scale: 0, x: "-50%", y: "-50%"}}
						animate={{scale: 1, x: "-50%", y: "-50%"}}
						exit={{scale: 0, x: "-50%", y: "-50%"}}>
						<h1>Settings</h1>
						<VisualizerOptions />
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default settingsModal;
