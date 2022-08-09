import { useState,useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {FaMapMarkerAlt, FaRegCalendarAlt} from "react-icons/fa";
import sanity from "../../lib/sanity";
import imageUrlFor from "../../utils/imageUrlFor";
import formatDate from "../../utils/formatDate";

import Button from "../UI/Button/Button";

import classes from "./nextEvent.module.scss";

const CountDownTimer = dynamic(() => import("../UI/CountDownTimer/CountDownTimer"), {ssr: false});

const NextEvent = ({concertData}) => {
	const [isDisabled , setIsDisabled] = useState(false);
	const [date, setDate] = useState(undefined);

	useEffect(() => {
		setDate(formatDate(concertData.date));
		setIsDisabled(localStorage.getItem(concertData.id) === "true"? true : false);
	},[]);

	const attendButtonHandler = ()=> {
		sanity.patch(concertData.id).inc({attendeesCount: 1}).commit();
		localStorage.setItem(concertData.id, true);
		setIsDisabled(true);
	}

	return (
		<div className={classes.body + " section__padding"}>
			<div className={classes.info}>
				<h4 className='gradient-text'>Next Event</h4>
				<p className={classes.title}>{concertData.title}</p>
				<div className={classes.details}>
					<p className={classes.date}>
						<FaRegCalendarAlt />
						{date}
					</p>
					<p className={classes.location}>
						<FaMapMarkerAlt />
						{concertData.location}
					</p>
				</div>
				<Button type='button' onClick={attendButtonHandler} disabled={isDisabled} >{isDisabled?"Waiting for you!":"I'm going"}</Button>
			</div>
			<div className={classes["event-cover"]}>
					<div className={classes["countDown-timer"]}>
						<CountDownTimer date={concertData.date} />
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
