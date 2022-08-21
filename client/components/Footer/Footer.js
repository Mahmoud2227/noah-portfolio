import { useEffect,useState } from "react";

import sanity from "../../lib/sanity";
import imageUrlFor from "../../utils/imageUrlFor";
import FooterLink from "./FooterLink";
import Logo from "../UI/Logo/Logo";
import BrandLogo from "../UI/BrandLogo/BrandLogo";

import classes from "./footer.module.scss";

const Footer = ({brands}) => {
	const [albums, setAlbums] = useState([]);
	useEffect(() => {
		const fetchAlbums = async () => {
			const query = `*[_type == "album"][0...5]{
				title,
				slug,
				_id
			}`;
			const albums = await sanity.fetch(query);
			setAlbums(albums);
		}
		fetchAlbums();
	},[])
	return (
		<footer className={classes.body + " section__padding"}>
			<Logo />
			<div className={classes["footer-lists"]}>
				<div>
					<h1 className='gradient-text'>MENU</h1>
					<ul>
						<FooterLink name='Home' href='/' type='menu' />
						<FooterLink name='About' href='/about' type='menu' />
						<FooterLink name='Music' href='/music' type='menu' />
						<FooterLink name='Concerts' href='/concerts' type='menu' />
						<FooterLink name='Blog' href='/blog' type='menu' />
						<FooterLink name='Contact' href='/contact' type='menu' />
					</ul>
				</div>
				<div>
					<h1 className='gradient-text'>LATEST ALBUMS</h1>
					<ul>
						{albums.map((album) => (
							<FooterLink key={album._id} name={album.title} href={`/music/albums/${album.slug.current}`} />
						))}
					</ul>
				</div>
			</div>
			<div className={classes["social-links"]}>
				{brands &&
					brands.map((brand) => (
						<BrandLogo
							icon={brand.icon}
							href={brand.url}
							title={brand.title}
							key={brand.id}
						/>
					))}
			</div>
		</footer>
	);
};

export default Footer;
