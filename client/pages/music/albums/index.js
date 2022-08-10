import sanity from "../../../lib/sanity";
import imageUrlFor from "../../../utils/imageUrlFor";
import AlbumCard from "../../../components/AlbumCard/AlbumCard";

import classes from "../../../styles/Albums.module.scss";

const Albums = ({albums}) => {
	console.log(albums);
	return (
		<div className={classes.body + " section__padding"}>
			<h1 className='gradient-text'>Albums</h1>
			<div className={classes["albums-container"]}>
				{albums.map((album) => (
					<AlbumCard
						key={album.id}
						title={album.title}
						imageSrc={imageUrlFor(album.cover).toString()}
            slug={album.slug.current}
						brands={album.musicBrands}
					/>
				))}
			</div>
		</div>
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
