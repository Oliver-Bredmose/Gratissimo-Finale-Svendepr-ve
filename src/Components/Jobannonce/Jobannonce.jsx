import { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import style from './Jobannonce.module.scss'
import heartIcon from '../../assets/icons/icons8-favorite-50.png'
import { useAuth } from '../../Hooks/useAuth'

export function Jobannonce({ id, organization, title, description, city, createdAt }) {
    const { user } = useAuth()
    // Vises når man trykker Gem uden at være logget ind
    const [visLoginBesked, setVisLoginBesked] = useState(false)
    // Svar efter man har gemt, fx "Jobbet er gemt i dine favoritter"
    const [besked, setBesked] = useState('')

    // Laver datoen om til samme format som i designet, fx "d. 22/3-25"
    const dato = new Date(createdAt)
    const indrykket = `d. ${dato.getDate()}/${dato.getMonth() + 1}-${String(dato.getFullYear()).slice(2)}`

    // Gem kræver login. Er man logget ind, gemmes jobbet i favoritter via API'et
    async function handleGem() {
        if (!user) {
            setVisLoginBesked(true)
            return
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_PUBLIC_BASE_URL}/api/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // API'et kræver accessToken for at vide, hvem der gemmer
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
                body: JSON.stringify({ jobListingId: id }),
            })
            if (!res.ok) throw new Error()
            setBesked('Jobbet er gemt i dine favoritter')
        } catch {
            setBesked('Jobbet kunne ikke gemmes. Prøv igen senere')
        }
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

                {visLoginBesked && (
                    <p className={style.Besked} role="alert">
                        Du skal være logget ind for at gemme et job. <Link to="/Logind">Log ind her</Link>
                    </p>
                )}
                {besked && (
                    <p className={style.Besked} role="alert">{besked}</p>
                )}
            </div>
        </article>
    )
}
