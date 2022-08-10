import {useRouter} from 'next/router';
import Link from "next/link";

import classes from "./navLink.module.scss"

const NavLink = ({name, href}) => {
  const router = useRouter();
  const isActive = "/" + router.pathname.split("/")[1] === href;
	return (
		<Link href={href}>
			<li  className={`${classes.body} ${isActive?classes.active:""}`}>
				<p>{name}</p>
			</li>
		</Link>
	);
};

export default NavLink;
