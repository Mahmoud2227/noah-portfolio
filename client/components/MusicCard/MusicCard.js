import Link from "next/link";
import Image from "next/image";
import {AiFillEye} from "react-icons/ai";
import BrandLogo from "../UI/BrandLogo/BrandLogo";
import imageUrlFor from "../../utils/imageUrlFor";

import classes from "./musicCard.module.scss";

import cd from "../../assets/cd.png";

const MusicCard = ({imageSrc, title, slug, brands}) => {
	return (
		<div className={classes.body}>
			<div className={classes["image-container"]}>
				<div className={classes["brands-container"]}>
					{brands.map((brand) => (
						<BrandLogo
							key={brand._key}
							icon={imageUrlFor(brand.icon).url()}
							href={brand.url}
							size='35px'
							title={brand.title}
						/>
					))}
				</div>
				<div className={classes.cd}>
					<Image src={cd} alt='cd' width={250} height={250} className={classes.cd} />
				</div>
				<div className={classes.cover}>
					<Image
						src={imageUrlFor(imageSrc).width(250).height(250).url()}
						alt={title + " cover"}
						blurDataURL={imageUrlFor(imageSrc).width(250).height(250).quality(5).blur(3).url()}
						placeholder='blur'
						width={250}
						height={250}
						priority
					/>
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

export default MusicCard;
