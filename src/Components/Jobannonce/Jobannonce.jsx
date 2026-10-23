import { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Jobannonce.module.scss'
import heartIcon from '../../assets/icons/icons8-favorite-50.png'
import { useAuth } from '../../Hooks/useAuth'

// På søgesiden: favoritId (findes hvis jobbet er gemt), onGem og onFjernFavorit styrer Gem / Fjern ♥.
// På Min side: onSlet eller onFjern viser en rød Slet- eller Fjern-knap i stedet for Gem.
export function Jobannonce({ organization, title, description, city, createdAt, category, workType, workHome, address, zipcode, favoritId, onGem, onFjernFavorit, onSlet, onFjern }) {
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

    // Gem kræver login. Er jobbet allerede gemt, fjerner knappen det igen.
    // Selve kaldet til API'et ligger på søgesiden (onGem / onFjernFavorit),
    // så søgesiden altid ved, hvilke jobs der er gemt
    async function handleGem() {
        setBesked('')
        if (!user) {
            setVisLoginBesked(true)
            return
        }

        try {
            if (favoritId) {
                await onFjernFavorit()
                setBesked('Jobbet er fjernet fra dine favoritter')
            } else {
                await onGem()
                setBesked('Jobbet er gemt i dine favoritter')
            }
        } catch {
            setBesked('Det virkede ikke. Prøv igen senere')
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
                    {onSlet && <button type="button" className={style.Roed} onClick={onSlet}>Slet</button>}
                    {onFjern && <button type="button" className={style.Roed} onClick={onFjern}>Fjern</button>}
                    {!onSlet && !onFjern && (
                        <button type="button" onClick={handleGem}>
                            {/* Gemt: Fjern med fyldt rødt hjerte. Ikke gemt: Gem med tomt hjerte */}
                            {favoritId ? (
                                <>Fjern <span className={style.Hjerte}>♥</span></>
                            ) : (
                                <>Gem <img src={heartIcon} alt="" /></>
                            )}
                        </button>
                    )}
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
