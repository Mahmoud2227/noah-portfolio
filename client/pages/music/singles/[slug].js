import Head from "next/head";
import Image from "next/image";
import {motion} from "framer-motion";
import {FaPlay, FaPause} from "react-icons/fa";

import BrandLogo from "../../../components/UI/BrandLogo/BrandLogo";
import sanity from "../../../lib/sanity";
import imageUrlFor from "../../../utils/imageUrlFor";
import getContainerVariants from "../../../utils/ContainerVariants";
import {useSelector, useDispatch} from "react-redux";
import {setActiveSong,playPause} from "../../../redux/features/playerSlice";

import classes from "../../../styles/SinglePage.module.scss";

import cd from "../../../assets/cd.png";

const SinglePage = ({single}) => {
	const dispatch = useDispatch();
	const {meta, isPlaying} = useSelector((state) => state.player);

	const handleClick = () => {
		const meta = {
			id: single.id,
			title: null,
			cover: single.cover,
		};
		dispatch(setActiveSong({song: single, i: 0, playlist: [single], meta}));
	}

	return (
		<>
			<Head>
				<title>{`${single.title} | Noah Estrada`}</title>
			</Head>
			<main className={classes.body + " section__padding"}>
				<div className={classes.title}>
					<h1>{single.title}</h1>
					<div className={classes.line}>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
				<div className={classes.container}>
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
									src={imageUrlFor(single.cover).url()}
									alt={single.title + " cover"}
									blurDataURL={imageUrlFor(single.cover)
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
									{single.id === meta?.id ? (
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
						<div className={classes["single-info"]}>
							<h2>{single.title}</h2>
							<p>
								Released: <span>{single.releaseDate}</span>
							</p>
							<p>
								Publisher: <span>Unknown</span>
							</p>
						</div>
						<div className={classes["brands-container"]}>
							{single.musicBrands.map((brand) => (
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
					</motion.div>
					<motion.div
						className={classes["container-right"]}
						initial='offScreen'
						whileInView='onScreen'
						viewport={{once: true}}
						variants={getContainerVariants("right")}></motion.div>
				</div>
			</main>
		</>
	);
};

export default SinglePage;

export const getStaticPaths = async () => {
	const singles = await sanity.fetch(`*[_type == "single"]`);
	const paths = singles.map((single) => ({params: {slug: single.slug.current}}));

	return {
		paths: paths,
		fallback: false,
	};
};

export const getStaticProps = async (context) => {
	const query = `*[_type=='single' && slug.current == '${context.params.slug}'][0]{
  title,cover,releaseDate,musicBrands,"id":_id,
  "url": audio.asset -> url
  }`;
	const single = await sanity.fetch(query);
	return {
		props: {
			single,
		},
		revalidate: 3600,
	};
};
