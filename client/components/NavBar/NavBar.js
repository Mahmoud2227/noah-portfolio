import Logo from "./Logo";
import NavLink from "./NavLink";

import classes from "./navBar.module.scss";
import BrandLogo from "../UI/BrandLogo";

import spotify from "../../assets/spotify.svg";
import deezer from "../../assets/deezer.svg";
import appleMusic from "../../assets/apple-music.svg";
import youtubeMusic from "../../assets/youtube-music.svg";

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
				<BrandLogo icon={spotify} href='https://open.spotify.com/' title='Spotify' />
				<BrandLogo
					icon={deezer}
					href='https://www.deezer.com/us/artist/14836941'
					title='Deezer'
					size='25px'
				/>
				<BrandLogo
					icon={appleMusic}
					href='https://music.apple.com/us/artist/noah-estrada/1512604152'
					title='Apple Music'
				/>
				<BrandLogo
					icon={youtubeMusic}
					href='https://music.youtube.com/channel/UCDn60yx-RdHOWSCPLodFonA'
					title='YouTube Music'
				/>
			</ul>
		</nav>
	);
};

export default NavBar;
