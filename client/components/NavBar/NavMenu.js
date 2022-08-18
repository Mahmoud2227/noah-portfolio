import {useEffect} from "react";
import NavLink from "./NavLink";
import {useRouter} from "next/router";
import {motion, useCycle} from "framer-motion";

import classes from "./navMenu.module.scss";

const menuVariants = {
	open: {
		clipPath: "circle(1100px at calc(100% - 3.75rem) 2.7rem)",
		transition: {
			duration: 0.4,
		},
	},
	closed: {
		clipPath: "circle(25px at calc(100% - 3.75rem) 2.7rem)",
		transition: {
			duration: 0.4,
			delay: 0.4,
		},
	},
};

const navigationVariants = {
	open: {
		transition: {staggerChildren: 0.07, delayChildren: 0.2},
	},
	closed: {
		transition: {staggerChildren: 0.05, staggerDirection: -1},
	},
};

const NavMenu = () => {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const router = useRouter();
	useEffect(() => {
		router.events.on("routeChangeStart", () => {
			toggleOpen(0);
		});
	}, [router]);

	return (
		<motion.div
			className={classes.body}
			variants={menuVariants}
			initial={{}}
			animate={isOpen ? "open" : "closed"}>
			<div className={`${classes.menuBurger} ${isOpen ? classes.open : ""}`} onClick={toggleOpen}>
				<span></span>
				<span></span>
			</div>
			<motion.ul variants={navigationVariants}>
				<NavLink name='Home' href='/' count='odd' />
				<NavLink name='About' href='/about' count='even' />
				<NavLink name='Music' href='/music' count='odd' />
				<NavLink name='Concerts' href='/concerts' count='even' />
				<NavLink name='Blog' href='/blog' count='odd' />
				<NavLink name='Contact' href='/contact' count='even' />
			</motion.ul>
		</motion.div>
	);
};

export default NavMenu;
