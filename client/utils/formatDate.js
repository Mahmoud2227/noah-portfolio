const formatDate = (date) => {
	const dateObj = new Date(date);
	return (
		dateObj.toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
			year: "numeric",
			timeZone: "America/Chicago",
		}) +
		" " +
		dateObj.toLocaleTimeString("en-US", {timeStyle: "short", timeZone: "America/Chicago"})
	);
};
export default formatDate;
