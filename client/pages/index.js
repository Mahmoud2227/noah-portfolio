import {useEffect, useState} from "react";
import sanity from "../lib/sanity";
import formatDate from "../utils/formatDate";

import Contact from "../components/Contact/Contact";
import Hero from "../components/Hero/Hero";
import NewAlbum from "../components/NewAlbum/NewAlbum";
import NextEvent from "../components/NextEvent/NextEvent";
import Subscription from "../components/Subscription/Subscription";
import PreLoading from "../components/PreLoading/PreLoading";

export default function Home({brands, nextConcert}) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		document.body.style.overflowY = "hidden";
		document.body.style.height = "100vh";

		setTimeout(() => {
			document.body.style.overflowY = "";
			document.body.style.height = "";
			setIsLoading(false);
		}, 3500);
	}, []);

	return (
		<>
			{isLoading && <PreLoading />}
			<Hero />
			<NewAlbum />
			<NextEvent concertData={nextConcert} />
			<Subscription />
			<Contact />
		</>
	);
}

export async function getStaticProps() {
	const nextConcertsQuery = `*[_type == 'concert'] | order(date desc)[0]{
		title,images,date,location,"id":_id
	}`;
	const nextConcert = await sanity.fetch(nextConcertsQuery);
	return {
		props: {
			nextConcert:{...nextConcert,formattedDate: formatDate(nextConcert.date)}
		},
		revalidate:3600,
	};
}
