import {useState, useEffect} from "react";
import Head from "next/head";
import Image from "next/image";

import imageUrlFor from "../../utils/imageUrlFor";
import sanity from "../../lib/sanity";
import formateDate from "../../utils/formatDate";

import classes from "../../styles/ConcertPage.module.scss";

const ConcertPage = ({concert}) => {
	const [formattedDate, setFormattedDate] = useState(concert.formattedDate);

	useEffect(() => {
		setFormattedDate(concert.formattedDate);
	}, []);
	return (
		<>
			<Head>
				<title>{concert.title} | Noah Estrada</title>
			</Head>
			<main className={classes.body + " section__padding"}>
				<h1>{concert.title}</h1>
				<div className={classes.container}>
					<div className={classes["container-left"]}>
						<div className={classes.cover}>
							<Image src={imageUrlFor(concert.cover).url()} width={350} height={500} />
						</div>
						<h2>DETAILS</h2>
						<div className={classes.info}>
							<p>
								Date: <span>{formattedDate.date}</span>
							</p>
							<p>
								Time: <span>{formattedDate.time}</span>
							</p>
							<p>
								Location: <span>{concert.location}</span>
							</p>
							<p>
								Target Audience: <span>All ages</span>
							</p>
							<p>
								Organized By: <span>unknown</span>
							</p>
						</div>
					</div>
					<div className={classes["container-right"]}>
						<h2>ABOUT THE CONCERT</h2>
						<p>{concert.description}</p>
					</div>
				</div>
			</main>
		</>
	);
};

export default ConcertPage;

export const getStaticPaths = async () => {
	const query = `*[_type == "concert"]`;
	const concerts = await sanity.fetch(query);
	const paths = concerts.map((concert) => ({
		params: {slug: concert.slug.current},
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async (context) => {
	const query = `*[_type == "concert" && slug.current == "${context.params.slug}"][0]`;
	const concert = await sanity.fetch(query);
	return {
		props: {
			concert: {...concert, formattedDate: formateDate(concert.date)},
		},
		revalidate: 3600,
	};
};
