import sanity from "../lib/sanity";
import formatDate from "../utils/formatDate";

import Contact from "../components/Contact/Contact";
import Hero from "../components/Hero/Hero";
import NewAlbum from "../components/NewAlbum/NewAlbum";
import NextEvent from "../components/NextEvent/NextEvent";
import Subscription from "../components/Subscription/Subscription";

export default function Home({nextConcert,newAlbum}) {
	return (
		<>
			<Hero />
			<NewAlbum albumData={newAlbum} />
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
	const newAlbumQuery = `*[_type == 'album'] | order(releaseDate desc)[0]{
		title,cover,songs[]{'url':audio.asset->url,title,_key}
	}`;
	const nextConcert = await sanity.fetch(nextConcertsQuery);
	const newAlbum = await sanity.fetch(newAlbumQuery);

	return {
		props: {
			nextConcert: {...nextConcert, formattedDate: formatDate(nextConcert.date)},
			newAlbum,
		},
		revalidate: 3600,
	};
}
