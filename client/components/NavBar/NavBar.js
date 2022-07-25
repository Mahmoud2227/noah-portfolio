import Logo from "./Logo";
import NavLink from "./NavLink";
import {FaSpotify, FaDeezer} from "react-icons/fa";

import classes from "./navBar.module.scss";
import BrandLogo from "./BrandLogo";

const NavBar = () => {
	return (
		<nav className={classes.body}>
			<Logo />
			<ul>
				<NavLink name='Home' href='/' />
				<NavLink name='About' href='/about' />
				<NavLink name='music' href='/music' />
				<NavLink name='concerts' href='/concerts' />
				<NavLink name='contact' href='/contact' />
			</ul>
			<ul>
				<BrandLogo
					icon={<FaSpotify />}
					href='https://open.spotify.com/'
					color='#1DB954'
					title='spotify profile'
				/>
				<BrandLogo
					icon={<FaDeezer />}
					href='https://www.deezer.com/en/'
					color='#fff'
					title='deezer profile'
				/>
			</ul>
		</nav>
	);
};

export default NavBar;
