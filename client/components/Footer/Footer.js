import FooterLink from "./FooterLink";

import Logo from "../UI/Logo/Logo";
import BrandLogo from "../UI/BrandLogo/BrandLogo";

import classes from "./footer.module.scss";

import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import youtube from "../../assets/youtube.svg";

const Footer = () => {
	return (
		<div className={classes.body + " section__padding"}>
			<Logo />
			<div className={classes["footer-lists"]}>
				<div>
					<h1 className='gradient-text'>MENU</h1>
					<ul>
						<FooterLink name='Home' href='/' type='menu' />
						<FooterLink name='About' href='/about' type='menu' />
						<FooterLink name='Music' href='/music' type='menu' />
						<FooterLink name='Concerts' href='/concerts' type='menu' />
						<FooterLink name='Contact' href='/contact' type='menu' />
					</ul>
				</div>
				<div>
					<h1 className='gradient-text'>LATEST ALBUMS</h1>
					<ul>
						<FooterLink name='Through My Eyes' href='/' />
						<FooterLink name='To Whom It May Concern' href='/' />
					</ul>
				</div>
			</div>
			<div className={classes["social-links"]}>
				<BrandLogo
					icon={facebook}
					href='https://www.facebook.com/noah.estrada.5'
					title='FaceBook'
				/>
				<BrandLogo
					icon={instagram}
					href='https://www.instagram.com/noahestrada_n.e.buddys/'
					title='Instagram'
				/>
				<BrandLogo
					icon={youtube}
					href='https://www.youtube.com/channel/UCq9lP30tXhWlipANznz2WkQ'
					title='Youtube'
				/>
			</div>
		</div>
	);
};

export default Footer;
