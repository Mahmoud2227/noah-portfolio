import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import sanity from "../lib/sanity";

import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import PreLoading from "../components/PreLoading/PreLoading";
import Spinner from "../components/UI/Spinner/Spinner";

import "../styles/globals.scss";

function MyApp({Component, pageProps}) {
	const [brands, setBrands] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [pageIsLoading, setPageIsLoading] = useState(false);

	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
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

	useEffect(() => {
		router.events.on("routeChangeStart", () => {
			setPageIsLoading(true);
		});
		router.events.on("routeChangeComplete", () => {
			setPageIsLoading(false);
		});
	}, [router]);

	return (
		<>
			<Head>
				<title>Noah Portfolio</title>
			</Head>
			{isLoading && <PreLoading />}
			{brands && <NavBar brands={brands.music} />}
			{!pageIsLoading && <Component {...pageProps} />}
			{pageIsLoading && <Spinner/>}
			<Footer brands={brands.social} />
		</>
	);
}

export default MyApp;
