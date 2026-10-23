import { Link } from "react-router-dom"
import style from "./Header.module.scss"

// Headeren vises på alle sider, derfor ligger den i Mainlayout
export function Header() {
    return(
        <section className={style.Header}>
            <div className={style.container}>
                <p>Vi hjælper dig på vej til dit næste frivillige job</p>
                <Link to="/Logind">Log ind eller opret dig</Link>
            </div>
        </section>
    )
}
