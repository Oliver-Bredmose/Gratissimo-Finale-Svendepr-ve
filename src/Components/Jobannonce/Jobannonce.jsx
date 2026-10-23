import { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import style from './Jobannonce.module.scss'
import heartIcon from '../../assets/icons/icons8-favorite-50.png'
import { useAuth } from '../../Hooks/useAuth'

export function Jobannonce({ id, organization, title, description, city, createdAt, category, workType, workHome, address, zipcode }) {
    const { user } = useAuth()
    // Styrer om kortet er foldet ud (Åben) eller lukket
    const [erAaben, setErAaben] = useState(false)
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
        // Når kortet er åbent, får det også klassen Aaben (skygge i designet)
        <article className={erAaben ? `${style.Jobannonce} ${style.Aaben}` : style.Jobannonce}>
            <div className={style.Tekst}>
                <p className={style.Organisation}>{organization}</p>
                <h2>{title}</h2>

                {/* Lukket: kort beskrivelse. Åben: kategori og hele beskrivelsen */}
                {erAaben ? (
                    <>
                        <p className={style.Kategori}>{category}</p>
                        <h3>Beskrivelse</h3>
                        <p className={style.FuldBeskrivelse}>{description}</p>
                    </>
                ) : (
                    <p className={style.Beskrivelse}>{description}</p>
                )}
            </div>

            <div className={style.Info}>
                <p>Lokation: <strong>{city}</strong></p>
                <p>Indrykket: <strong>{indrykket}</strong></p>

                {erAaben && (
                    <>
                        <p>Arbejdstid: <strong>{workType}</strong></p>
                        <p>Hjemmearbejde: <strong>{workHome}</strong></p>

                        <div className={style.Kontakt}>
                            <h3>Kontakt</h3>
                            <p>{organization}</p>
                            <p>{address}</p>
                            <p>{zipcode} {city}</p>
                        </div>
                    </>
                )}

                <div className={style.Knapper}>
                    <button type="button" onClick={handleGem}>
                        Gem <img src={heartIcon} alt="" />
                    </button>
                    {/* Samme knap åbner og lukker kortet. !erAaben vender true/false om */}
                    <button type="button" onClick={() => setErAaben(!erAaben)} aria-expanded={erAaben}>
                        {erAaben ? 'Luk' : 'Åben'}
                    </button>
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
