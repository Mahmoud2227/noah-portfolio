import {useEffect, useState} from "react";
import {createPortal} from "react-dom";

import Logo from "./Logo";
import NavLink from "./NavLink";
import BrandLogo from "../UI/BrandLogo";
import NavMenu from "./NavMenu";

import classes from "./navBar.module.scss";

import spotify from "../../assets/spotify.svg";
import deezer from "../../assets/deezer.svg";
import appleMusic from "../../assets/apple-music.svg";
import youtubeMusic from "../../assets/youtube-music.svg";

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		return () => setMounted(false);
	}, []);

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
			</div>
			<div
				className={`${classes["menuBurger"]} ${isOpen ? classes.open : ""}`}
				onClick={() => setIsOpen((prevState) => !prevState)}>
				<span></span>
				<span></span>
			</div>
			{mounted && isOpen && createPortal(<NavMenu isOpen={isOpen} setIsOpen={setIsOpen} />, document.querySelector("#__next"))}
		</nav>
	);
};

export default NavBar;
