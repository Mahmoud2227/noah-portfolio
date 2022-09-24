import Image from "next/image";
import imageUrlFor from "../../../utils/imageUrlFor";

import classes from "./track.module.scss";

const Track = ({isPlaying, isActive, activeSong, cover, albumTitle}) => (
	<div className={classes.body}>
		<div className={classes.coverContainer}>
			{isActive && <Image src={imageUrlFor(cover).url()} alt='cover art' width={64} height={64} />}
		</div>
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

export default Track;
