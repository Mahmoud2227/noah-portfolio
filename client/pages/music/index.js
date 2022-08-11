import Link from "next/link";
import Image from "next/image";

import classes from "../../styles/Music.module.scss";

import albums from "../../assets/albums.jpg";
import singles from "../../assets/singles.jpg";

const Music = () => {
	return (
		<>
			<div className={classes.body}>
				<div >
					<div className={classes.background}>
						<Image src={albums} alt='albums' objectFit="cover" />
					</div>
					<Link href='music/albums' title='Albums'>
						Albums
					</Link>
				</div>
				<div>
					<div className={classes.background}>
						<Image src={singles} alt='singles' objectFit="cover" />
					</div>
					<Link href='music/singles' title='Singles'>
						Singles
					</Link>
				</div>
			</div>
		</>
	);
};

export default Music;
