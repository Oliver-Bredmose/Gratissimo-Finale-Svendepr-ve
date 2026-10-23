import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../Hooks/useAuth"
import style from "./MinsideHeader.module.scss"

// Toppen af Min side: velkomst, Log ud / Rediger profil og knapperne
// der skifter mellem Mine annoncer og Mine favoritter.
// redigerSide={true} bruges på Rediger profil: linket går til Min side, og fanerne skjules
export function MinsideHeader({ redigerSide }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        navigate("/Logind")
    }

    return(
        <>
            <title>{redigerSide ? 'Rediger profil | Gratissimo' : 'Min side | Gratissimo'}</title>
            <section className={style.Intro}>
                <h1>Velkommen {user.firstname}</h1>
                <p>
                    Rediger eller slet dine annoncer. Du kan også danne dig et overblik over de
                    annoncer du har gemt som favorit, samt fjerne dem igen
                </p>
                <div className={style.Links}>
                    <button type="button" onClick={handleLogout}>Log ud</button>
                    {redigerSide ? (
                        <Link to="/Minannonce">Min Side</Link>
                    ) : (
                        <Link to="/Redigerminside">Rediger Profil</Link>
                    )}
                </div>
            </section>

            {/* NavLink markerer den side, man er på, så den kan blive rød */}
            {!redigerSide && (
                <nav className={style.Faner} aria-label="Min side">
                    <NavLink to="/Minannonce">Mine annoncer</NavLink>
                    <NavLink to="/Minfavoritter">Mine favoritter</NavLink>
                </nav>
            )}
        </>
    )
}
