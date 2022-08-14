import sanity from "../../../lib/sanity";

import MusicCard from "../../../components/MusicCard/MusicCard";

import classes from "../../../styles/Singles.module.scss";

const Singles = ({singles}) => {
	return (
		<div className={classes.body + " section__padding"}>
			<h1 className='gradient-text'>Singles</h1>
			<div className={classes["singles-container"]}>
				{singles.map((single) => (
					<MusicCard
						key={single.id}
						title={single.title}
						imageSrc={single.cover}
						slug={single.slug.current}
						brands={single.musicBrands}
            type="single"
					/>
				))}
			</div>
		</div>
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
