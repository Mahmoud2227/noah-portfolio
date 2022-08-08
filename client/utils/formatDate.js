const formatDate = (date) => {
	const dateObj = new Date(date);
	return (
		dateObj.toDateString("en-US") + " " + dateObj.toLocaleTimeString("en-US", {timeStyle: "short"})
	);
};
export default formatDate;
