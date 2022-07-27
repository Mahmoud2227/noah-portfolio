import {forwardRef} from 'react'
import NavLink from "./NavLink";
import CssTransition from "react-transition-group/CSSTransition"

import classes from "./navMenu.module.scss";

const NavMenu = forwardRef(({state,setIsOpen},ref) => {
	const classNames = [classes.body, state === "entering" ? classes.open :state === "exiting"? classes.close : null];
	return (
		<div ref={ref} className={classNames.join(" ")}>
			<div
				className={`${classes["menuBurger"]} ${state === "entering" ? classes.open :state === 'entered'? classes.open : ""}`}
				onClick={() => setIsOpen((prevState) => !prevState)}>
				<span></span>
				<span></span>
			</div>
			<ul>
				<NavLink name='Home' href='/' />
				<NavLink name='About' href='/about' />
				<NavLink name='Music' href='/music' />
				<NavLink name='Concerts' href='/concerts' />
				<NavLink name='Contact' href='/contact' />
			</ul>
		</div>
	);
});

export default NavMenu;
