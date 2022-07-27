import {forwardRef} from 'react'
import NavLink from "./NavLink";
import CssTransition from "react-transition-group/CSSTransition"

import classes from "./navMenu.module.scss";

const NavMenu = forwardRef(({state,setIsOpen},ref) => {
	console.log(state);
	return (
		<div ref={ref} className={`${classes["body"]} ${state === "entered" ? classes.open: ""}`}>
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
