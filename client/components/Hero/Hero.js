import Image from "next/image";
import Link from "next/link";

import Button from "../UI/Button/Button";
import imageUrlFor from "../../utils/imageUrlFor";

import classes from "./hero.module.scss";

const Hero = ({data}) => {
	return (
		<section className={classes.body}>
			<div className={classes["background"]}>
				<Image
					src={imageUrlFor(data.homeBackground).url()}
					alt='background'
					layout='fill'
					objectFit='cover'
					priority
				/>
			</div>
			<div className={classes["content"]}>
				<p>
					Star <span /> Excellence
				</p>
				<h1>{data.saying1}</h1>
				<p>{data.saying2}</p>
				<Link href='/about'>
					<Button type='button'>Learn More</Button>
				</Link>
			</div>
		</section>
	);
};

export default Hero;
