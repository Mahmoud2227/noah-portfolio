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
		<Link href={href}>
			<motion.li
				className={`${classes.body} ${isActive ? classes.active : ""}`}
				variants={linkVariants}>
				<p>{name}</p>
			</motion.li>
		</Link>
	);
};

export default NavLink;
