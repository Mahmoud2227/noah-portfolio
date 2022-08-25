import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import sanity from "../../lib/sanity";
import imageUrlFor from "../../utils/imageUrlFor";

import classes from "../../styles/Music.module.scss";

const Music = ({images}) => {
	return (
		<>
			<Head>
				<title>{"Music | Noah Estrada"}</title>
			</Head>
			<main className={classes.body}>
				<section>
					<div className={classes.background}>
						<Image
							src={imageUrlFor(images.albumsBackground).url()}
							alt='albums'
							layout='fill'
							objectFit='cover'
							priority
						/>
					</div>
					<Link href='music/albums' title='Albums'>
						Albums
					</Link>
				</section>
				<section>
					<div className={classes.background}>
						<Image
							src={imageUrlFor(images.singlesBackground).url()}
							alt='singles'
							layout='fill'
							objectFit='cover'
							priority
						/>
					</div>
					<Link href='music/singles' title='Singles'>
						Singles
					</Link>
				</section>
			</main>
		</>
	);
};

export const getStaticProps = async () => {
	const query = `*[_type == 'siteSettings'][0]{
		albumsBackground,singlesBackground
	}`;
	const images = await sanity.fetch(query);

	return {
		props: {
			images,
		},
		revalidate: 3600,
	};
};

export default Music;
