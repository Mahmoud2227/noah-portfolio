import Image from "next/image"

import classes from "./brandLogo.module.scss";

const BrandLogo = ({icon, href, title,size='25px'}) => {
	return (
		<div className={classes.icon} >
			<a href={href} target='_blank' title={title}>
				<Image src={icon} alt={title} width={size} height={size} />
			</a>
		</div>
	);
};

export default BrandLogo;
