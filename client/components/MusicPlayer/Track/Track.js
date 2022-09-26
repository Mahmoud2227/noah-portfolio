import Image from "next/image";
import {motion} from "framer-motion";

import imageUrlFor from "../../../utils/imageUrlFor";

import classes from "./track.module.scss";

const Track = ({isPlaying, isActive, activeSong, cover, albumTitle}) => {
	return (
		<div className={classes.body}>
			<motion.div
				className={classes.coverContainer}
				animate={
					isPlaying
						? {rotate: 360, transition: {duration: 5, ease: "linear", repeat: Infinity}}
						: {rotate: 0}
				}>
				{isActive && (
					<Image src={imageUrlFor(cover).url()} alt='cover art' width={64} height={64} />
				)}
			</motion.div>
			<div className={classes["song-info"]}>
				{isActive ? (
					<>
						<p className={classes.active}>{activeSong.title}</p>
						<p className={classes.active}>{albumTitle}</p>
					</>
				) : (
					<p className={classes.notActive}>No active Song</p>
				)}
			</div>
		</div>
	);
};

export default Track;
