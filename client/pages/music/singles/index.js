import Head from "next/head";
import {motion} from "framer-motion";

import sanity from "../../../lib/sanity";
import MusicCard from "../../../components/MusicCard/MusicCard";

import classes from "../../../styles/Singles.module.scss";

const singlesContainerVariants = {
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

const Singles = ({singles}) => {
	return (
		<>
			<Head>
				<title>Singles | Noah Estrada</title>
			</Head>
			<main className={classes.body + " section__padding"}>
				<h1 className='gradient-text'>Singles</h1>
				<motion.div
					className={classes["singles-container"]}
					initial='hidden'
					animate='visible'
					variants={singlesContainerVariants}>
					{singles.map((single) => (
						<MusicCard
							key={single.id}
							title={single.title}
							imageSrc={single.cover}
							slug={single.slug.current}
							brands={single.musicBrands}
							type='single'
						/>
					))}
				</motion.div>
			</main>
		</>
	);
};

export default Singles;

export const getStaticProps = async () => {
	const query = `*[_type=='single']{
    title,releaseDate,cover,slug,musicBrands,"id":_id
  }`;

	const singles = await sanity.fetch(query);
	return {
		props: {
			singles,
		},
		revalidate: 3600,
	};
};
