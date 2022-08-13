const getTimeDiff = (dt2) => {
	const dt1 = new Date()
	const time = (dt2.getTime() - dt1.getTime()) / 1000;
	const year = Math.abs(Math.round(time / (60 * 60 * 24) / 365.25));
	const month = Math.abs(Math.round(time / (60 * 60 * 24 * 7 * 4)));
	const days = Math.abs(Math.round(time / (3600 * 24)));
	return {
		year,
		month,
		days,
	};
};

export default getTimeDiff;
