import {useState} from "react";
import {AnimatePresence} from "framer-motion";
import {wrap} from "popmotion";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";

import classes from "./Testimonials.module.scss";
import CardItem from "./CardItem/CardItem";

const Testimonials = ({testimonials}) => {
	const [[page, direction], setPage] = useState([0, 0]);

	const cardIndex = wrap(0, testimonials.length, page);

	const paginate = (newDirection) => {
		setPage([page + newDirection, newDirection]);
	};

	return (
		<div className={classes.body}>
			<AnimatePresence initial={false} custom={direction}>
				{testimonials.map(
					(item, index) =>
						cardIndex === index && (
							<CardItem
								name={item.name}
								image={item.imageurl}
								feedback={item.feedback}
								direction={direction}
								paginate={paginate}
								key={item._id}
							/>
						)
				)}
			</AnimatePresence>
			<div className={classes.next} onClick={() => paginate(1)}>
				<AiOutlineArrowRight />
			</div>
			<div className={classes.prev} onClick={() => paginate(-1)}>
				<AiOutlineArrowLeft />
			</div>
		</div>
	);
};

export default Testimonials;
