import Link from "next/link";

import classes from "./navLink.module.scss"

const NavLink = ({name, href}) => {
	return (
		<Link href={href}>
			<li  className={classes['body']}>
				<p>{name}</p>
			</li>
		</Link>
	);
};

export default NavLink;
