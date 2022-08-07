import {useEffect, useState} from "react";
import sanity from "../lib/sanity";

import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import NavBar from "../components/NavBar/NavBar";
import NewAlbum from "../components/NewAlbum/NewAlbum";
import NextEvent from "../components/NextEvent/NextEvent";
import Subscription from "../components/Subscription/Subscription";
import PreLoading from "../components/PreLoading/PreLoading";

export default function Home({brands,nextConcert}) {
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
			<NavBar brands={brands.musicBrands} />
			<Hero />
			<NewAlbum />
			<NextEvent concertData={nextConcert} />
			<Subscription />
			<Contact />
			<Footer brands={brands.socialBrands} />
		</>
	);
}

export async function getStaticProps() {
	const brandsQuery = `*[_type == "brand"]{
		title,url,icon,type,"id":_id
	}`;
	const nextConcertsQuery = `*[_type == 'concert'] | order(date desc)[0]{
		title,images,date,location,"id":_id
	}`;
	const brands = await sanity.fetch(brandsQuery);
	const socialBrands = brands.filter((brand) => brand.type === "social");
	const musicBrands = brands.filter((brand) => brand.type === "music");
	const nextConcert = await sanity.fetch(nextConcertsQuery);
	return {
		props: {
			brands: {
				socialBrands,
				musicBrands,
			},
			nextConcert,
		},
	};
}
