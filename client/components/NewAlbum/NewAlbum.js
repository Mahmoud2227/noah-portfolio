import { useState } from "react";
import Image from "next/image";
import ImageUrlFor from "../../utils/imageUrlFor";

import classes from "./newAlbum.module.scss";

import AudioPlayer from "../audioPlayer/audioPlayer";

const NewAlbum = ({albumData}) => {
	const [curTrack, setCurTrack] = useState(albumData.songs[0]);
	return (
		<div className={classes.body + " section__padding"}>
			<div className={classes["image-container"]}>
				<Image
					src={ImageUrlFor(albumData.cover).url()}
					alt='new-album'
					width={400}
					height={400}
					blurDataURL={ImageUrlFor(albumData.cover).width(400).height(400).quality(5).blur(3).url()}
					placeholder='blur'
				/>
			</div>
			<div className={classes.content}>
				<h4 className='gradient-text'>New Album</h4>
				<p className={classes.title}>{albumData.title}</p>
				<p className={classes.lyrics}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae magna at elit porta
					aliquam.
				</p>
				<AudioPlayer trackList={albumData.songs} type='album' curTrack={curTrack} setCurTrack={setCurTrack} />
			</div>
		</div>
	);
};

export default NewAlbum;
