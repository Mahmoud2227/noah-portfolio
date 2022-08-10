import {useRouter} from "next/router";
import Link from "next/link";

import classes from "./footerLink.module.scss";

const FooterLink = ({name, href, type}) => {
	let isActive;
	if (type === "menu") {
		const router = useRouter();
		isActive = "/" + router.pathname.split("/")[1] === href;
	}
	return (
		<Link href={href}>
			<li className={`${classes.body} ${isActive ? classes.active : ""}`}>
				<p>{name}</p>
			</li>
		</Link>
	);
};

export default FooterLink;
