import { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Jobannonce.module.scss'
import heartIcon from '../../assets/icons/icons8-favorite-50.png'

export function Jobannonce({ id, organization, title, description, city, createdAt }) {
    // Styrer om beskeden "du skal være logget ind" vises
    const [visBesked, setVisBesked] = useState(false)

    // Laver datoen om til samme format som i designet, fx "d. 22/3-25"
    const dato = new Date(createdAt)
    const indrykket = `d. ${dato.getDate()}/${dato.getMonth() + 1}-${String(dato.getFullYear()).slice(2)}`

    // Gem kræver login. Login laver vi i trin 4, så indtil da vises beskeden altid.
    // Senere: hvis brugeren er logget ind, gemmes jobbet med POST /api/favorites
    function handleGem() {
        setVisBesked(true)
    }

    return (
        <article className={style.Jobannonce}>
            <div className={style.Tekst}>
                <p className={style.Organisation}>{organization}</p>
                <h2>{title}</h2>
                <p className={style.Beskrivelse}>{description}</p>
            </div>

            <div className={style.Info}>
                <p>Lokation: <strong>{city}</strong></p>
                <p>Indrykket: <strong>{indrykket}</strong></p>

                <div className={style.Knapper}>
                    <button type="button" onClick={handleGem}>
                        Gem <img src={heartIcon} alt="" />
                    </button>
                    <Link to={`/Søgeresultater/${id}`}>Åben</Link>
                </div>

                {visBesked && (
                    <p className={style.Besked} role="alert">
                        Du skal være logget ind for at gemme et job. <Link to="/Logind">Log ind her</Link>
                    </p>
                )}
            </div>
        </article>
    )
}
