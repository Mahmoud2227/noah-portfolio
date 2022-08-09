const formatDate = (date) => {
	const dateObj = new Date(date);
	return (
		dateObj.toLocaleDateString(undefined, {dateStyle:"full"}) +
		" " +
		dateObj.toLocaleTimeString(undefined, {timeStyle: "short"})
	);
};
export default formatDate;
