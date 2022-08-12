import Image from "next/image";
import BrandLogo from "../../../components/UI/BrandLogo/BrandLogo";
import sanity from "../../../lib/sanity";
import imageUrlFor from "../../../utils/imageUrlFor";
import {IoPlay} from "react-icons/io5";

import SongsList from "../../../components/SongsList/SongsList";

import classes from "../../../styles/AlbumPage.module.scss";

import cd from "../../../assets/cd.png";
import AudioPlayer from "../../../components/audioPlayer/audioPlayer";

const AlbumPage = ({album}) => {
	return (
		<div className={classes.body + " section__padding"}>
			<div className={classes.title}>
				<h1>{album.title}</h1>
				<div className={classes.line}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes["container-left"]}>
					<div className={classes["image-container"]}>
						<div className={classes.cd}>
							<Image src={cd} alt='cd' width={300} height={300} className={classes.cd} />
						</div>
						<div className={classes.cover}>
							<Image
								src={imageUrlFor(album.cover).url()}
								alt={album.title + " cover"}
								blurDataURL={imageUrlFor(album.cover)
									.width(300)
									.height(300)
									.quality(5)
									.blur(3)
									.url()}
								placeholder='blur'
								width={300}
								height={300}
								priority
							/>
							<span className={classes["play-icon"]}>
								<IoPlay />
							</span>
						</div>
					</div>
					<div className={classes["album-info"]}>
						<h2>{album.title}</h2>
						<p>
							Released: <span>{album.releaseDate}</span>
						</p>
						<p>
							Publisher: <span>Unknown</span>
						</p>
					</div>
					<div className={classes["brands-container"]}>
						{album.musicBrands.map((brand) => (
							<BrandLogo
								key={brand._key}
								icon={imageUrlFor(brand.icon).url()}
								href={brand.url}
								size='45px'
								title={brand.title}
								priority
							/>
						))}
					</div>
				</div>
				<div className={classes["container-right"]}>
					<AudioPlayer trackList={album.songs} />
					<SongsList songs={album.songs} />
				</div>
			</div>
		</div>
	);
};

export default AlbumPage;

export const getStaticPaths = async () => {
	const albums = await sanity.fetch(`*[_type == "album"]`);
	const paths = albums.map((album) => ({params: {slug: album.slug.current}}));

	return {
		paths: paths,
		fallback: false,
	};
};

export const getStaticProps = async (context) => {
	const query = `*[_type == "album" && slug.current == "${context.params.slug}"][0]{
    title,releaseDate,cover,songs,musicBrands,songs[]{'url':audio.asset->url,title,duration,_key}
  }`;
	const album = await sanity.fetch(query);
	return {
		props: {
			album,
		},
		revalidate: 3600,
	};
};
