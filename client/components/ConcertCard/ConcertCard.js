import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";

import imageUrlFor from "../../utils/imageUrlFor";

import classes from "./concertCard.module.scss";

const concertCardVariants = {
	hidden: {
		opacity: 0,
		y: "-50%",
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};

const ConcertCard = ({concert}) => {
	const [slicedDate, setSlicedDate] = useState(concert.slicedDate);

	useEffect(() => {
		const date = {
			day: new Date(concert.date).getDate(),
			month: new Date(concert.date).toLocaleDateString(undefined, {month: "short"}),
		};
		setSlicedDate(date);
	}, []);

	return (
		<motion.article className={classes.body} variants={concertCardVariants}>
			<Link href={`/concerts/${concert.slug}`}>
				<a title={concert.title}>
					<div className={classes.date}>
						<span>{slicedDate.day}</span>
						<span>{slicedDate.month}</span>
					</div>
					<div className={classes.overlay}>
						<p>{concert.title}</p>
					</div>
					<div className={classes.background}>
						<Image src={imageUrlFor(concert.cover).url()} width={300} height={450} />
					</div>
				</a>
			</Link>
		</motion.article>
	);
};

export default ConcertCard;
