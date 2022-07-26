import {useState, useEffect} from "react";

const useCountDown = (targetDate) => {
	const countDownDate = new Date(targetDate).getTime();

	const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

	useEffect(() => {
		const interval = setInterval(() => {
			if(typeof window !== "undefined") {

				setCountDown(countDownDate - new Date().getTime());
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [countDownDate]);

  const {days, hours, minutes, seconds} = getReturnValues(countDown);

  let status = days + hours + minutes + seconds <= 0 ? "expired" : "active";

  return {countDown:getReturnValues(countDown),status};
};

const getReturnValues = (countDown) => {
	// calculate time left
	const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
	const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

	return {days, hours, minutes, seconds};
};

export default useCountDown;


