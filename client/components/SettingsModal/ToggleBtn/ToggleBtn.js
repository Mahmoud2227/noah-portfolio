import React from "react";
import {AiFillSetting} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toggleHidden } from "../../../redux/features/settingsSlice";

import classes from "./toggleBtn.module.scss";

const ToggleBtn = () => {
  const dispatch = useDispatch();
	return (
		<span className={classes.btn} onClick={()=>dispatch(toggleHidden())}>
			<AiFillSetting />
		</span>
	);
};

export default ToggleBtn;
