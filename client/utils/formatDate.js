const formatDate = (date) => {
	const dateObj = new Date(date);
	console.log(dateObj.toString());
	return dateObj.toLocaleString(undefined, {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
		compact: true,
	});
	// return (
	// 	dateObj.toLocaleDateString("en-US", {
	// 		weekday: "short",
	// 		month: "short",
	// 		day: "numeric",
	// 		year: "numeric",
	// 		timeZone: "America/Chicago",
	// 	}) +
	// 	" " +
	// 	dateObj.toLocaleTimeString("en-US", {timeStyle: "short", timeZone: "America/Chicago"})
	// );
};
export default formatDate;
