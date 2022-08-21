import Image from "next/image";
import imageUrlFor from "../../../utils/imageUrlFor";
import {motion} from "framer-motion";

import classes from "./cardItem.module.scss";

const swipeConfidenceThreshold = 7000;
const swipePower = (offset, velocity) => {
	return Math.abs(offset) * velocity;
};

const variants = {
	enter: (direction) => {
		return {
			x: direction > 0 ? "100%" : "-100%",
			opacity: 0,
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction) => {
		return {
			zIndex: 0,
			x: direction < 0 ? "100%" : "-100%",
			opacity: 0,
		};
	},
};

const CardItem = ({direction, name, image, feedback,paginate}) => {
	return (
		<motion.div
			className={classes.body}
			custom={direction}
			variants={variants}
			initial='enter'
			animate='center'
			exit='exit'
			transition={{
				x: {type: "spring", stiffness: 300, damping: 30},
				opacity: {duration: 0.2},
			}}
      whileTap={{cursor: "grabbing"}}
			drag='x'
			dragConstraints={{left: 0, right: 0}}
			dragElastic={1}
			onDragEnd={(e, {offset, velocity}) => {
				const swipe = swipePower(offset.x, velocity.x);

				if (swipe < -swipeConfidenceThreshold) {
					paginate(1);
				} else if (swipe > swipeConfidenceThreshold) {
					paginate(-1);
				}
			}}>
			<div className={classes.gradient}>
				<div className={classes.image}>
					<Image src={imageUrlFor(image).url()} layout='fixed' width={90} height={90} />
				</div>
			</div>
      <div className={classes.content}>
        <h2>{name}</h2>
        <q>{feedback}</q>
      </div>
		</motion.div>
	);
};

export default CardItem;
