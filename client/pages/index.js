import Head from "next/head";

import sanity from "../lib/sanity";
import formatDate from "../utils/formatDate";

import {Contact,Hero,NewAlbum,NextEvent} from "../components"

export default function Home({nextConcert, newAlbum, homeData}) {
	return (
		<>
			<Head>
				<title>Noah Estrada</title>
			</Head>
			<main>
				<Hero data={homeData} />
				<section className='section__padding'>
					<NewAlbum albumData={newAlbum} />
				</section>
				<section className='section__padding'>
					<NextEvent concertData={nextConcert} />
				</section>
				{/* <Subscription /> */}
				<section className='section__padding'>
					<Contact />
				</section>
			</main>
		</>
	);
}

export const getStaticProps = async () => {
	const query = `{
		"nextConcert":*[_type == 'concert'] | order(date desc)[0]{
		title,images,date,location,"slug":slug.current,"id":_id
		},
		"newAlbum":*[_type == 'album'] | order(releaseDate desc)[0]{
		title,cover,songs[]{'url':audio.asset->url,title,duration,_key},"id":_id
		},
		"homeData": *[_type == 'siteSettings'][0] {
			homeBackground,saying1,saying2
		}
	}`;

	const {nextConcert, newAlbum, homeData} = await sanity.fetch(query);

	return {
		props: {
			nextConcert: {...nextConcert, formattedDate: formatDate(nextConcert.date)},
			newAlbum,
			homeData,
		},
		revalidate: 3600,
	};
};
