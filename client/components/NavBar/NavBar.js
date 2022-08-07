import {useRef, useState} from "react";
import Transition from "react-transition-group/Transition";
import imageUrlFor from "../../utils/imageUrlFor";

import Logo from "../UI/Logo/Logo";
import NavLink from "./NavLink";
import BrandLogo from "../UI/BrandLogo/BrandLogo";
import NavMenu from "./NavMenu";

import classes from "./navBar.module.scss";

const NavBar = ({brands}) => {
	const [isOpen, setIsOpen] = useState(false);

	const nodeRef = useRef(null);

	return (
		<nav className={classes.body}>
			<Logo />
			<ul>
				<NavLink name='Home' href='/' />
				<NavLink name='About' href='/about' />
				<NavLink name='Music' href='/music' />
				<NavLink name='Concerts' href='/concerts' />
				<NavLink name='Contact' href='/contact' />
			</ul>
			<div className={classes["music-brands"]}>
				{brands.map((brand) => (
					<BrandLogo
						icon={imageUrlFor(brand.icon).toString()}
						href={brand.url}
						title={brand.title}
						key={brand.id}
					/>
				))}
			</div>
			<div
				className={`${classes["menuBurger"]} ${isOpen ? classes.open : ""}`}
				onClick={() => setIsOpen((prevState) => !prevState)}
				style={{opacity: isOpen ? 0 : 1}}>
				<span></span>
				<span></span>
			</div>
			<Transition in={isOpen} timeout={300} nodeRef={nodeRef} mountOnEnter unmountOnExit>
				{(state) => <NavMenu state={state} setIsOpen={setIsOpen} ref={nodeRef} />}
			</Transition>
		</nav>
	);
};

export default NavBar;
