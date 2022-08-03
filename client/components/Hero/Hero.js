import Image from "next/image";
import Link from "next/link";

import Button from "../UI/Button/Button";

import background from "../../assets/background.jpg";

import classes from "./hero.module.scss";

const Hero = () => {
	return (
		<main className={classes.body}>
			<div className={classes["background"]}>
				<Image src={background} alt='background' layout='fill' objectFit="cover" />
			</div>
			<div className={classes["content"]}>
				<p>
					Etoile <span /> Excellence{" "}
				</p>
				<h1>Music is life itself.</h1>
				<p>
					The emotions caused by music, the attitudes of its composers and players, and the venues
				</p>
				<Link href='/about'>
					<Button type='button'>Learn More</Button>
				</Link>
			</div>
		</main>
	);
};

export default Hero;
