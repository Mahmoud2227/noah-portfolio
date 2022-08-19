import {motion} from "framer-motion";

import NextEvent from "../../components/NextEvent/NextEvent";
import ConcertCard from "../../components/ConcertCard/ConcertCard";
import sanity from "../../lib/sanity";
import formatDate from "../../utils/formatDate";

import classes from "../../styles/Concerts.module.scss";

const concertsVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		}
	}
}

const index = ({concerts}) => {
	return (
		<main className={classes.body + " section__padding"}>
			<h1>Concerts</h1>
			<section>
				<NextEvent concertData={concerts[0]} />
			</section>
			<motion.div
				className={classes.concerts}
				initial='hidden'
				whileInView='visible'
				viewport={{once: true, amount: 0.3}}
				variants={concertsVariants}>
				{concerts.map((concert) => (
					<ConcertCard concert={concert} key={concert.id} />
				))}
			</motion.div>
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
		revalidate: 3600,
	};
};
