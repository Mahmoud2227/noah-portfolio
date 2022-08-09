import Link from "next/link";

import NavBar from "../../components/NavBar/NavBar";
import sanity from "../../lib/sanity";
import classes from "../../styles/Music.module.scss";

const Music = ({brands}) => {
	return (
		<>
			<div className={classes.body}>
				<div className={classes.albums}>
					<Link href='music/albums' title='Albums'>
						Albums
					</Link>
				</div>
				<div className={classes.singles}>
					<Link href='music/singles' title='Singles'>
						Singles
					</Link>
				</div>
			</div>
		</>
	);
};

export default Music;
