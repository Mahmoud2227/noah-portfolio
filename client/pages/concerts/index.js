import NextEvent from "../../components/NextEvent/NextEvent";
import ConcertCard from "../../components/ConcertCard/ConcertCard";
import sanity from "../../lib/sanity";
import formatDate from "../../utils/formatDate";

import classes from "../../styles/Concerts.module.scss";

const index = ({concerts}) => {
	return (
		<main className={classes.body + " section__padding"}>
			<h1>Concerts</h1>
			<section>
				<NextEvent concertData={concerts[0]} />
			</section>
			<div className={classes.concerts}>
				{concerts.map((concert) => (
					<ConcertCard concert={concert} key={concert.id} />
				))}
			</div>
		</main>
	);
};

export default index;

export const getStaticProps = async () => {
	const query = `*[_type == 'concert'] | order(date desc){
		title,cover,images,date,location,"slug":slug.current,"id":_id
	}`;
	const concerts = await sanity.fetch(query);
	concerts[0].formattedDate = formatDate(concerts[0].date);

	const updateConcerts = concerts.map((concert) => ({
		...concert,
		slicedDate: {
			day: new Date(concert.date).getDate(),
			month: new Date(concert.date).toLocaleDateString(undefined, {month: "short"}),
		},
	}));

	return {
		props: {
			concerts: updateConcerts,
		},
	};
};
