import {useEffect, useState} from "react";
import sanity from "../lib/sanity";
import formatDate from "../utils/formatDate";

import Contact from "../components/Contact/Contact";
import Hero from "../components/Hero/Hero";
import NewAlbum from "../components/NewAlbum/NewAlbum";
import NextEvent from "../components/NextEvent/NextEvent";
import Subscription from "../components/Subscription/Subscription";

export default function Home({nextConcert}) {
	return (
		<>
			<Hero />
			<NewAlbum />
			<NextEvent concertData={nextConcert} />
			{/* <Subscription /> */}
			<Contact />
		</>
	);
}

export const getStaticProps = async () => {
	const nextConcertsQuery = `*[_type == 'concert'] | order(date desc)[0]{
		title,images,date,location,"id":_id
	}`;
	const nextConcert = await sanity.fetch(nextConcertsQuery);
	return {
		props: {
			nextConcert: {...nextConcert, formattedDate: formatDate(nextConcert.date)},
		},
		revalidate: 3600,
	};
}
