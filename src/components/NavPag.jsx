import { NavLink } from "react-router-dom";
import styles from "./NavPag.module.css";
import Logo from "./Logo";

function NavPag() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">produts</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLinkn}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavPag;
