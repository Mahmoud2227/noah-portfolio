import Link from "next/link";
import Image from "next/image";
import {AiFillEye} from "react-icons/ai";

import classes from "./albumCard.module.scss";

import cd from "../../assets/cd.png";

const AlbumCard = ({imageSrc, title,slug}) => {
	return (
		<div className={classes.body}>
			<div className={classes["image-container"]}>
				<div className={classes.cd}>
					<Image src={cd} alt='cd' width={250} height={250} className={classes.cd} />
				</div>
				<div className={classes.cover}>
					<Image src={imageSrc} alt={title + " cover"} width={250} height={250} />
				</div>
				<Link href={"/music/albums/" + slug} className={classes["album-link"]}>
          <a className={classes["album-link"]} title={title}>
						<AiFillEye />
					</a>
				</Link>
			</div>
      <h2>{title}</h2>
		</div>
	);
};

export default AlbumCard;
