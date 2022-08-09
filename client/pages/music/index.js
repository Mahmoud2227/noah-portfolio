import Link from "next/link";

import NavBar from "../../components/NavBar/NavBar";
import sanity from "../../lib/sanity";
import classes from "../../styles/Music.module.scss";

const Music = ({brands}) => {
	return (
		<>
			<NavBar brands={brands.music} />
			<div className={classes.body}>
				<div className={classes.albums}>
					<div className={classes.overlay} />
					<Link href='/albums'>
						<a href='/albums' title='albums'>
							Albums
						</a>
					</Link>
				</div>
				<div className={classes.singles}>
					<div className={classes.overlay} />
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

export async function getStaticProps() {
	const brandsQuery = `{
		"music":*[_type == 'brand' && type == 'music']{title,url,icon,"id":_id},
		"social":*[_type == 'brand' && type == 'social']{title,url,icon,"id":_id}
	}`;
	const brands = await sanity.fetch(brandsQuery);
	return {
		props: {
			brands,
		},
		revalidate: 3600,
	};
}
