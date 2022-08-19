import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {FaMapMarkerAlt, FaRegCalendarAlt} from "react-icons/fa";
import {motion} from "framer-motion";
import sanity from "../../lib/sanity";
import imageUrlFor from "../../utils/imageUrlFor";
import formatDate from "../../utils/formatDate";
import getContainerVariants from "../../ContainerVariants";

import Button from "../UI/Button/Button";

import classes from "./nextEvent.module.scss";

const CountDownTimer = dynamic(() => import("../UI/CountDownTimer/CountDownTimer"), {ssr: false});

const NextEvent = ({concertData}) => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [date, setDate] = useState(concertData.formattedDate);

	useEffect(() => {
		setDate(formatDate(concertData.date));
		setIsDisabled(localStorage.getItem(concertData.id) === "true" ? true : false);
	}, []);

	const attendButtonHandler = () => {
		sanity.patch(concertData.id).inc({attendeesCount: 1}).commit();
		localStorage.setItem(concertData.id, true);
		setIsDisabled(true);
	};

	return (
		<motion.div
			className={classes.body}
			initial='offScreen'
			whileInView='onScreen'
			viewport={{once: true, amount: 0.3}}>
			<motion.div className={classes.info} variants={getContainerVariants("left")}>
				<h2 className='gradient-text'>Next Event</h2>
				<Link href={`/concerts/${concertData.slug}`}>
					<a className={classes.title} title={concertData.title}>
						<p>{concertData.title}</p>
					</a>
				</Link>
				<div className={classes.details}>
					<p>
						<FaRegCalendarAlt />
						{date.fullDate}
					</p>
					<p>
						<FaMapMarkerAlt />
						{concertData.location}
					</p>
				</div>
				<Button type='button' onClick={attendButtonHandler} disabled={isDisabled}>
					{isDisabled ? "Waiting for you!" : "I'm going"}
				</Button>
			</motion.div>
			<motion.div className={classes["event-cover"]} variants={getContainerVariants("right")}>
				<div className={classes["countDown-timer"]}>
					<CountDownTimer date={concertData.date} />
				</div>
				<div className={classes["images-container"]}>
					<div className={classes.image}>
						<Image
							src={imageUrlFor(concertData.images[1]).url()}
							alt='nextEvent-1'
							objectFit='fill'
							blurDataURL={imageUrlFor(concertData.images[1]).quality(5).blur(5).url()}
							placeholder='blur'
							width={400}
							height={400}
						/>
					</div>
					<div className={classes.image}>
						<Image
							src={imageUrlFor(concertData.images[0]).url()}
							alt='nextEvent-2'
							objectFit='fill'
							blurDataURL={imageUrlFor(concertData.images[0]).blur(5).quality(5).url()}
							placeholder='blur'
							width={400}
							height={400}
						/>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default NextEvent;
