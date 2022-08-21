import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import Script from "next/script"

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

		const setColors = async () => {
			const colorsQuery = `*[_type == 'siteSettings'][0]{
				"first-color":color1.hex,"second-color":color2.hex,"third-color":color3.hex
			}`;
			const colors = await sanity.fetch(colorsQuery);
			Object.keys(colors).forEach((key) => {
				document.documentElement.style.setProperty(`--${key}`, colors[key]);
			});
		};
		setColors();
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
			<Script
				strategy='lazyOnload'
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
			/>

			<Script strategy='lazyOnload'>
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
					page_path: window.location.pathname,
					});
				`}
			</Script>
			<Head>
				<title>Noah Portfolio</title>
			</Head>
			{isLoading && <PreLoading />}
			{brands && <NavBar brands={brands.music} />}
			{!pageIsLoading && <Component {...pageProps} />}
			{pageIsLoading && <Spinner />}
			<Footer brands={brands.social} />
		</>
	);
}

export default MyApp;
