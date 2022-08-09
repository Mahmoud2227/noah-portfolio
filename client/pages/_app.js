import {useState, useEffect} from "react";
import Head from "next/head";
import sanity from "../lib/sanity";

import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

import "../styles/globals.scss";
import PreLoading from "../components/PreLoading/PreLoading";

function MyApp({Component, pageProps}) {
	const [brands, setBrands] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			document.body.style.overflowY = "unset";
			document.body.style.height = "unset";
			setIsLoading(false);
		}, 3500);

		const fetchBrands = async () => {
			const brandsQuery = `{
				"music":*[_type == 'brand' && type == 'music']{title,url,icon,"id":_id},
				"social":*[_type == 'brand' && type == 'social']{title,url,icon,"id":_id}
			}`;
			const brands = await sanity.fetch(brandsQuery);
			setBrands(brands);
		};
		fetchBrands();
	}, []);

	return (
		<>
			<Head>
				<title>Noah Portfolio</title>
			</Head>
			{isLoading && <PreLoading />}
			{brands && <NavBar brands={brands.music} />}
			<Component {...pageProps} />
			<Footer brands={brands.social} />
		</>
	);
}

export default MyApp;
