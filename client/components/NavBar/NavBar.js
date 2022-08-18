import imageUrlFor from "../../utils/imageUrlFor";

import Logo from "../UI/Logo/Logo";
import NavLink from "./NavLink";
import BrandLogo from "../UI/BrandLogo/BrandLogo";
import NavMenu from "./NavMenu";

import classes from "./navBar.module.scss";

const NavBar = ({brands}) => {
	return (
		<nav className={classes.body}>
			<Logo />
			<ul>
				<NavLink name='Home' href='/' />
				<NavLink name='About' href='/about' />
				<NavLink name='Music' href='/music' />
				<NavLink name='Concerts' href='/concerts' />
				<NavLink name='Blog' href='/blog' />
				<NavLink name='Contact' href='/contact' />
			</ul>
			<div className={classes["music-brands"]}>
				{brands &&
					brands.map((brand) => (
						<BrandLogo
							icon={imageUrlFor(brand.icon).toString()}
							href={brand.url}
							title={brand.title}
							key={brand.id}
						/>
					))}
			</div>
			<div className={classes["mobile-menu"]}>
				<NavMenu />
			</div>
		</nav>
	);
};

export default NavBar;
