import {useEffect, useState} from "react";

import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import NavBar from "../components/NavBar/NavBar";
import NewAlbum from "../components/NewAlbum/NewAlbum";
import NextEvent from "../components/NextEvent/NextEvent";
import Subscription from "../components/Subscription/Subscription";
import PreLoading from "../components/PreLoading/PreLoading";

export default function Home() {
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
			<NavBar />
			<Hero />
			<NewAlbum />
			<NextEvent />
			<Subscription />
			<Contact />
			<Footer />
		</>
	);
}
