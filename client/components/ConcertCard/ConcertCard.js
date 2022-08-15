import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import imageUrlFor from "../../utils/imageUrlFor";

import classes from "./concertCard.module.scss";

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
		<article className={classes.body}>
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
		</article>
	);
};

export default ConcertCard;
