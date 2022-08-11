import Link from "next/link";
import Image from "next/image";

import classes from "./logo.module.scss";

import logo from "../../../assets/logo.svg"

const Logo = () => {
	return (
		<Link href='/'>
			<div className={classes["logo"]}>
				<Image src={logo} alt='logo' width={80} height={25} layout="fixed" />
			</div>
		</Link>
	);
};

export default Logo;
