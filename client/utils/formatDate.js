const formatDate = (date) => {
	const dateMilliseconds = new Date(date).getTime();
	const dateObj = new Date(dateMilliseconds);
	return (
		dateObj.toDateString("en-US") + " " + dateObj.toLocaleTimeString("en-US", {timeStyle: "short"})
	);
};
export default formatDate;
