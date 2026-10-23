import { Link, useLocation } from "react-router-dom"
import { LoginForm } from "./LoginForm"
import { OpretBrugerForm } from "./OpretBrugerForm"
import style from "./Login.module.scss"

// Én side til både Log ind og Opret bruger.
// URL'en bestemmer formularen: /Logind viser login, /OpretProfil viser opret.
export function Login() {
    const location = useLocation()
    const visOpret = location.pathname === '/OpretProfil'

    return(
        <>
            <section className={style.Intro}>
                <h1>Log ind eller opret dig som bruger</h1>
                <p>
                    Når du opretter en profil på Gratissimo får du adgang til at oprette, slette og
                    redigere i job annoncer. Som privatperson får du mulighed for at gemme de jobs
                    du kunne være interesseret i.
                </p>
                <Link to="/Logind">Log ind for at gå til min side</Link>
            </section>

            <section className={style.Formular}>
                {visOpret ? <OpretBrugerForm /> : <LoginForm />}
            </section>
        </>
    )
}
