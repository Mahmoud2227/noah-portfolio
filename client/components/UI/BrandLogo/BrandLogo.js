import Image from "next/image"

import classes from "./brandLogo.module.scss";

const BrandLogo = ({icon, href, title,size='20px'}) => {
	return (
		<div className={classes.icon} style={{width:size}}>
			<a href={href} target='_blank' title={title}>
				<Image src={icon} />
			</a>
		</div>
	);
};

export default BrandLogo;
