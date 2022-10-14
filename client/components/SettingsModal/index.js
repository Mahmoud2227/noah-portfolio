import React from "react";
import { useSelector } from "react-redux";

import VisualizerOptions from "./VisualizerSettings/VisualizerSettings";
import ToggleBtn from "./ToggleBtn/ToggleBtn";

import classes from "./settingsModal.module.scss";

const settingsModal = () => {
  const isHidden = useSelector((state) => state.settings.isHidden);
	return (
		<>
			<ToggleBtn />
			{!isHidden && <div className={classes.body}>
				<h1>Settings</h1>
				<VisualizerOptions />
			</div>}
		</>
	);
};

export default settingsModal;
