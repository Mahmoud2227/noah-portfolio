import NavLink from "./NavLink";

import classes from "./navMenu.module.scss";

const NavMenu = ({isOpen, setIsOpen}) => {
	return (
		<div className={`${classes["body"]} ${isOpen ? classes["open"] : ""}`}>
			<div
				className={`${classes["menuBurger"]} ${isOpen ? classes.open : ""}`}
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
};

export default NavMenu;
