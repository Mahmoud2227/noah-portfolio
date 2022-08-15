import sanity from "../../../lib/sanity";
import MusicCard from "../../../components/MusicCard/MusicCard";

import classes from "../../../styles/Albums.module.scss";

const Albums = ({albums}) => {
	return (
		<main className={classes.body + " section__padding"}>
			<h1 className='gradient-text'>Albums</h1>
			<div className={classes["albums-container"]}>
				{albums.map((album) => (
					<MusicCard
						key={album.id}
						title={album.title}
						imageSrc={album.cover}
            slug={album.slug.current}
						brands={album.musicBrands}
						type="album"
					/>
				))}
			</div>
		</main>
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
