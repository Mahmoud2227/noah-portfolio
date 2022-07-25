import Logo from "./Logo";
import NavLink from "./NavLink";

import classes from "./navBar.module.scss"

const NavBar = () => {
  return (
    <nav className={classes.body} >
      <Logo/>
      <ul>
        <NavLink name="Home" href="/"/>
        <NavLink name="About" href="/about"/>
        <NavLink name="music" href="/music"/>
        <NavLink name="concerts" href="/concerts"/>
        <NavLink name="contact" href="/contact"/>
      </ul>
    </nav>
  );
}

export default NavBar;