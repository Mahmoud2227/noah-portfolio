import {useState} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import ImageUrlFor from "../../utils/imageUrlFor";
import AudioPlayer from "../audioPlayer/audioPlayer";

import {useDispatch, useSelector} from "react-redux";

import {setActiveSong} from "../../redux/features/playerSlice";

import classes from "./newAlbum.module.scss";

import getContainerVariants from "../../ContainerVariants";

const NewAlbum = ({albumData}) => {
	const [curTrack, setCurTrack] = useState(albumData.songs[0]);

	const dispatch = useDispatch();

	const clicking = () => {
		dispatch(setActiveSong({song: curTrack, album: albumData, i: 0}));
	};

	return (
		<motion.div
			className={classes.body}
			initial='offScreen'
			whileInView='onScreen'
			viewport={{once: true, amount: 0.3}}>
			<motion.div className={classes["image-container"]} variants={getContainerVariants("left")}>
				<Image
					src={ImageUrlFor(albumData.cover).url()}
					alt='new-album'
					width={500}
					height={500}
					blurDataURL={ImageUrlFor(albumData.cover).width(400).height(400).quality(5).blur(3).url()}
					placeholder='blur'
					onClick={clicking}
				/>
			</motion.div>
			<motion.div className={classes.content} variants={getContainerVariants("right")}>
				<h2 className='gradient-text'>New Album</h2>
				<p className={classes.title}>{albumData.title}</p>
				<p className={classes.lyrics}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae magna at elit porta
					aliquam.
				</p>
				<AudioPlayer
					trackList={albumData.songs}
					type='album'
					curTrack={curTrack}
					setCurTrack={setCurTrack}
				/>
			</motion.div>
		</motion.div>
	);
};

export default NewAlbum;
