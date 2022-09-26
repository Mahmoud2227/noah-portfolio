import Head from "next/head";
import Image from "next/image";
import {FaPlay, FaPause} from "react-icons/fa";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";

import BrandLogo from "../../../components/UI/BrandLogo/BrandLogo";
import SongsList from "../../../components/SongsList/SongsList";
import sanity from "../../../lib/sanity";
import imageUrlFor from "../../../utils/imageUrlFor";
import getContainerVariants from "../../../ContainerVariants";
import {playPause, setActiveSong} from "../../../redux/features/playerSlice";

import classes from "../../../styles/AlbumPage.module.scss";

import cd from "../../../assets/cd.png";

const AlbumPage = ({album}) => {
	const dispatch = useDispatch();
	const {meta, isPlaying} = useSelector((state) => state.player);

	const handleClick = () => {
		const meta = {
			id: album.id,
			title: album.title,
			cover: album.cover,
		};
		dispatch(setActiveSong({song: album.songs[0], i: 0, playlist: album.songs, meta}));
	};

	return (
		<>
			<Head>
				<title>{`${album.title} | Noah Estrada`}</title>
			</Head>
			<main className={classes.body + " section__padding"}>
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
				<motion.div className={classes.container}>
					<motion.div
						className={classes["container-left"]}
						initial='offScreen'
						whileInView='onScreen'
						viewport={{once: true}}
						variants={getContainerVariants("left")}>
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
									{album.id === meta?.id ? (
										isPlaying ? (
											<FaPause onClick={() => dispatch(playPause(false))} />
										) : (
											<FaPlay onClick={() => dispatch(playPause(true))} />
										)
									) : (
										<FaPlay onClick={handleClick} />
									)}
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
								/>
							))}
						</div>
					</motion.div>
					<motion.div
						className={classes["container-right"]}
						initial='offScreen'
						whileInView='onScreen'
						viewport={{once: true}}
						variants={getContainerVariants("right")}>
						<SongsList album={album} />
					</motion.div>
				</motion.div>
			</main>
		</>
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
    title,releaseDate,cover,songs,musicBrands,songs[]{'url':audio.asset->url,title,duration,_key},"id":_id
  }`;
	const album = await sanity.fetch(query);
	return {
		props: {
			album,
		},
		revalidate: 3600,
	};
};
