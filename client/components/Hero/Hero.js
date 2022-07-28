import Image from "next/image";
import Link from "next/link";

import background from "../../assets/background.jpg";

import classes from "./hero.module.scss";

const Hero = () => {
	return (
		<main className={classes.body}>
			<div className={classes["background"]}>
				<Image src={background} />
			</div>
			<div className={classes["content"]}>
				<p>
					Etoile <span /> Excellence{" "}
				</p>
				<h1>Music is life itself.</h1>
				<p>
					The emotions caused by music, the attitudes of its composers and players, and he venues
				</p>
				<Link href='/about'>
					<button type='button'> About Me</button>
				</Link>
			</div>
		</main>
	);
};

export default Hero;
