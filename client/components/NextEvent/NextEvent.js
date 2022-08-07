import Image from "next/image";
import dynamic from "next/dynamic";
import {FaMapMarkerAlt, FaRegCalendarAlt} from "react-icons/fa";
import imageUrlFor from "../../utils/imageUrlFor";

import Button from "../UI/Button/Button";

import classes from "./nextEvent.module.scss";

import newEvent1 from "../../assets/newEvent-1.jpg";
import newEvent2 from "../../assets/newEvent-2.jpg";

const CountDownTimer = dynamic(() => import("../UI/CountDownTimer/CountDownTimer"), {ssr: false});

const NextEvent = ({concertData}) => {
	const concertDate = new Date(concertData.date);
	console.log(concertData);
	return (
		<div className={classes.body + " section__padding"}>
			<div className={classes.info}>
				<h4 className='gradient-text'>Next Event</h4>
				<p className={classes.title}>{concertData.title}</p>
				<div className={classes.details}>
					<p className={classes.date}>
						<FaRegCalendarAlt />
						{concertDate.toDateString("en-US") +
							" " +
							concertDate.toLocaleTimeString("en-US", {timeStyle: "short"})}
					</p>
					<p className={classes.location}>
						<FaMapMarkerAlt />
						{concertData.location}
					</p>
				</div>
				<Button type='button'>I'm going</Button>
			</div>
			<div className={classes["event-cover"]}>
					<div className={classes["countDown-timer"]}>
						<CountDownTimer date={concertDate} />
					</div>
				<div className={classes["images-container"]}>
					<div className={classes.image} >
						<Image
							src={imageUrlFor(concertData.images[0]).toString()}
							alt='nextEvent-1'
							layout='fill'
							objectFit='cover'
						/>
					</div>
					<div className={classes.image}>
						<Image
							src={imageUrlFor(concertData.images[1]).toString()}
							alt='nextEvent-2'
							layout='fill'
							objectFit='cover'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NextEvent;
