import Image from "next/image";

import classes from "./newAlbum.module.scss";

import newAlbum from "../../assets/new-album.jpeg";

const NewAlbum = () => {
	return (
		<div className={classes.body + " section__padding"}>
			<div className={classes["image-container"]}>
				<Image src={newAlbum} alt='new-album' layout="intrinsic" />
			</div>
			<div className={classes.content}>
        <h4 className="gradient-text">New Album</h4>
				<p className={classes.title}>Through My Eyes</p>
				<p className={classes.lyrics}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae magna at elit porta
					aliquam.
				</p>
			</div>
		</div>
	);
};

export default NewAlbum;
