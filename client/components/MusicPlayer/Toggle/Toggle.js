import React from "react";
import {motion} from "framer-motion";

import {FaAngleDown} from "react-icons/fa";

import classes from "./toggle.module.scss";

const toggleVariants = {
	hidden: {
		rotate: 180,
		transition: {
			duration: 0.1,
		},
	},
	visible: {
		rotate: 0,
		transition: {
			duration: 0.1,
		},
	},
};

const Toggle = ({isHidden, toggleHidden}) => {
	return (
		<motion.span
			className={classes.body}
			variants={toggleVariants}
			animate={isHidden ? "hidden" : "visible"}
			onClick={toggleHidden}>
			<FaAngleDown />
		</motion.span>
	);
};

export default Toggle;
