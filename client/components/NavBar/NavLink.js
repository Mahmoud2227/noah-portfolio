import {useRouter} from "next/router";
import Link from "next/link";
import {motion} from "framer-motion";

import classes from "./navLink.module.scss";

const NavLink = ({name, href, count}) => {
	const linkVariants = {
		open: {
			x: 0,
			opacity: 1,
		},
		closed: {
			x: count === "odd" ? "-100%" : "100%",
			opacity: 0,
		},
	};

	const router = useRouter();
	const isActive = "/" + router.pathname.split("/")[1] === href;

	return (
		<motion.li
			className={`${classes.body} ${isActive ? classes.active : ""}`}
			variants={linkVariants}>
			<Link href={href}>
				<a title={name}>{name}</a>
			</Link>
		</motion.li>
	);
};

export default NavLink;
