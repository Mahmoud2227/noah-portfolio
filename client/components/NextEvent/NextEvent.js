import Image from "next/image";
import {FaMapMarkerAlt, FaRegCalendarAlt} from "react-icons/fa";

import classes from "./nextEvent.module.scss";

import newEvent1 from "../../assets/newEvent-1.jpg";
import newEvent2 from "../../assets/newEvent-2.jpg";
import CountDownTimer from "../UI/CountDownTimer/CountDownTimer";

const NextEvent = () => {
	return (
		<div className={classes.body + " section__padding"}>
			<div className={classes.info}>
				<h4 className='gradient-text'>Next Event</h4>
				<p className={classes.title}>Sounds Like Summer Concert Series</p>
				<div className={classes.details}>
					<p className={classes.date}> <FaRegCalendarAlt/>20 Dec 2020, 10:00 p.m</p>
					<p className={classes.location}><FaMapMarkerAlt/>Red Square, Moscow, Russia</p>
				</div>
			</div>
			<div className={classes["event-cover"]}>
				<CountDownTimer/>
				<div className={classes["images-container"]}>
					<div>
						<Image src={newEvent1} alt='newEvent-1' />
					</div>
					<div>
						<Image src={newEvent2} alt='newEvent-2' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default NextEvent;
