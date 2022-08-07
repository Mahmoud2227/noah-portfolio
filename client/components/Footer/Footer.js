import imageUrlFor from "../../utils/imageUrlFor";
import FooterLink from "./FooterLink";
import Logo from "../UI/Logo/Logo";
import BrandLogo from "../UI/BrandLogo/BrandLogo";

import classes from "./footer.module.scss";

const Footer = ({brands}) => {
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
				{brands.map((brand) => (
					<BrandLogo
						icon={imageUrlFor(brand.icon).toString()}
						href={brand.url}
						title={brand.title}
						key={brand.id}
					/>
				))}
			</div>
		</div>
	);
};

export default Footer;
