import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className={style.navbar}>
      <div className={style.logo}>Inventory App</div>

      <ul className={style.navLinks}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/getProduct">Products</Link>
        </li>
        <li>
          <Link to="/creatProduct">Agregar Producto</Link>
        </li>
        <li>
          <Link to="#">Contact</Link>
        </li>
      </ul>

      <p className={style.login}><Link to="/login">Login</Link></p>
    </nav>
  );
}

export default Navbar;
