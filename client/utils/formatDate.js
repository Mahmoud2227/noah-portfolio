const formatDate = (date) => {
	const dateObj = new Date(date);
	return {
		fullDate:
			dateObj.toLocaleDateString(undefined, {dateStyle: "full"}) +
			" " +
			dateObj.toLocaleTimeString(undefined, {timeStyle: "short"}),
		date : dateObj.toLocaleDateString(undefined, {dateStyle: "full"}),
		time : dateObj.toLocaleTimeString(undefined, {timeStyle: "short"}),
	};
};
export default formatDate;
