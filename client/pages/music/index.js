import Link from "next/link";

import NavBar from "../../components/NavBar/NavBar";
import sanity from "../../lib/sanity";
import classes from "../../styles/Music.module.scss";

const Music = ({brands}) => {
	return (
		<>
			<div className={classes.body}>
				<div className={classes.albums}>
					<Link href='/albums'>
						<a href='/albums' title='albums'>
							Albums
						</a>
					</Link>
				</div>
				<div className={classes.singles}>
					<Link href='singles'>
						<a href='singles' title='singles'>
							Singles
						</a>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Music;