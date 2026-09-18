import { NavLink } from "react-router-dom"
import style from "./Navbar.module.scss"
import logo from "../../assets/logo/logo-white.png"
export function Navbar() {
  
  return (
    <div className={style.img}>

    <a href="/">
    <figure >
    <img src={logo} alt="Gratissimo_logo" />
    </figure>
    </a>

      <nav className={style.Navstyle}>
        <ul>
          <li><NavLink to={"/Søgeresultater"}>Alle Jobs</NavLink></li>
          <li><NavLink to={"/OpretAnnonce"}>Opret Annonce</NavLink></li>
          <li><NavLink to={"/Nyhedsside"}>Nyheder</NavLink></li>
           <li><NavLink to={"/OpretProfil"}>Opret Profil</NavLink></li>
           <li><NavLink to={"/Login"}>Log ind</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}