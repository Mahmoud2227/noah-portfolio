import Image from "next/image"
import imageUrlFor from "../../../utils/imageUrlFor";

import classes from "./brandLogo.module.scss";

const BrandLogo = ({icon, href, title,size=25}) => {
	return (
		<div className={classes.icon}>
			<a href={href} target='_blank' title={title}>
				<Image src={imageUrlFor(icon).url()} alt={title} width={size} height={size} />
			</a>
		</div>
	);
};

export default BrandLogo;
