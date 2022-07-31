import useCountdown from "../../../hooks/useCountDown";

import classes from "./countDownTimer.module.scss";

const CountDownTimer = () => {
	const {countDown} = useCountdown("December 17, 2022 03:24:00");

	return (
		<div className={classes.body}>
			<div>
				<span>{countDown.days}</span>
        <span>Day</span>
			</div>
			<div>
				<span>{countDown.hours}</span>
        <span>Hr</span>
			</div>
			<div>
				<span>{countDown.minutes}</span>
        <span>Min</span>
			</div>
			<div>
				<span>{countDown.seconds}</span>
        <span>Sec</span>
			</div>
		</div>
	);
};

export default CountDownTimer;
