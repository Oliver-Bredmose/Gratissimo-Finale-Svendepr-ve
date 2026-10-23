import { Link, NavLink, useNavigate } from "react-router-dom"
import style from "./Navbar.module.scss"
import logo from "../../assets/logo/logo-white.png"
import { useAuth } from "../../Hooks/useAuth"

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Log ud rydder cookies (i AuthProvider) og sender brugeren til login
  async function handleLogout() {
    await logout()
    navigate("/Logind")
  }

  return (
    <header>
      <div className={style.img}>
        <div className={style.container}>
          <Link to="/">
            <figure>
              <img src={logo} alt="Gratissimo - gå til forsiden" />
            </figure>
          </Link>
        </div>
      </div>

      <nav className={style.Navstyle}>
        <div className={style.container}>
          <ul>
            <li><NavLink to={"/Søgeresultater"}>Alle Jobs</NavLink></li>
            <li><NavLink to={"/OpretAnnonce"}>Opret Annonce</NavLink></li>
            <li><NavLink to={"/Nyhedsside"}>Nyheder</NavLink></li>
          </ul>

          {/* Til højre: skifter alt efter om brugeren er logget ind */}
          <ul className={style.Bruger}>
            {user ? (
              <>
                <li><NavLink to={"/Minannonce"}>Min side</NavLink></li>
                <li><button type="button" onClick={handleLogout}>Log ud</button></li>
              </>
            ) : (
              <>
                <li><NavLink to={"/OpretProfil"}>Opret Profil</NavLink></li>
                <li><NavLink to={"/Logind"}>Log ind</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}
