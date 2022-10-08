import Head from "next/head";
import {motion} from "framer-motion";

import sanity from "../../../lib/sanity";

import { MusicCard } from "../../../components";

import classes from "../../../styles/Albums.module.scss";

const albumContainerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const Albums = ({albums}) => {
	return (
		<>
			<Head>
				<title>{"Albums | Noah Estrada"}</title>
			</Head>
			<main className={classes.body + " section__padding"}>
				<h1 className='gradient-text'>Albums</h1>
				<motion.div
					className={classes["albums-container"]}
					initial='hidden'
					animate='visible'
					variants={albumContainerVariants}>
					{albums.map((album) => (
						<MusicCard
							key={album.id}
							title={album.title}
							imageSrc={album.cover}
							slug={album.slug.current}
							brands={album.musicBrands}
							type='album'
						/>
					))}
				</motion.div>
			</main>
		</>
	);
};

export default Albums;

export const getStaticProps = async () => {
	const albumsQuery = `*[_type=='album']{
    title,releaseDate,cover,slug,musicBrands,"id":_id
  }`;
	const albums = await sanity.fetch(albumsQuery);
	return {
		props: {
			albums,
		},
		revalidate: 3600,
	};
};
