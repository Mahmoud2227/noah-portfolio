import {IconContext} from "react-icons/lib";

import classes from "./brandLogo.module.scss";

const BrandLogo = ({icon, color,href,title}) => {
	return (
		<div className={classes.icon}>
			<a href={href} target="_blank" title={title}>
				<IconContext.Provider value={{color: color}}>{icon}</IconContext.Provider>
			</a>
		</div>
	);
};

export default BrandLogo;
