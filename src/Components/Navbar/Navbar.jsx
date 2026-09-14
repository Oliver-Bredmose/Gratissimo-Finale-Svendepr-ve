import { NavLink } from "react-router-dom"
import style from "./../NavBar/Navbar.module.scss"

export function Navbar() {
  
  return (
    <div>



      <nav className={style.Navstyle}>
        <ul>
          <li><NavLink to={"/Forside"}>Alle Jobs</NavLink></li>
          <li><NavLink to={"/OpretAnnonce"}>Opret Annonce</NavLink></li>
          <li><NavLink to={"/Nyheds-side"}>Nyheder</NavLink></li>
           <li><NavLink to={"/OpretProfil"}>Opret Profil</NavLink></li>
           <li><NavLink to={"/Login"}>Log ind</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}