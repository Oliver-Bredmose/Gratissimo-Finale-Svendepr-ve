import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useAuth } from "../../Hooks/useAuth"
import { MinsideHeader } from "../../Components/MinsideHeader/MinsideHeader"
// Formularen ser ud som på login-siden, så vi genbruger den styling
import formStyle from "../Loginside/Login.module.scss"
import style from "./MinsideRediger.module.scss"

const API_URL = import.meta.env.VITE_PUBLIC_BASE_URL

export function MinsideRediger() {
    const { user, updateUser } = useAuth()

    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState('')
    const [succes, setSucces] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Henter brugerens nuværende oplysninger, så felterne er udfyldt fra start
    useEffect(() => {
        if (!user) return

        async function hentBruger() {
            try {
                const res = await fetch(`${API_URL}/api/users`, {
                    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
                })
                if (!res.ok) throw new Error()
                // API'et giver en liste med én bruger
                const data = await res.json()
                const bruger = data[0]
                setEmail(bruger.email)
                setFirstname(bruger.firstname)
                setLastname(bruger.lastname)
                // Telefon er et tal i API'et, men feltet skal bruge tekst
                setPhone(bruger.phone ? String(bruger.phone) : '')
            } catch {
                setServerError('Dine oplysninger kunne ikke hentes. Prøv igen senere')
            } finally {
                setIsLoading(false)
            }
        }

        hentBruger()
    }, [user])

    // Samme validering som på Opret profil
    function validate() {
        const newErrors = {}
        if (!email) {
            newErrors.email = 'Skriv din email'
        } else if (!email.includes('@')) {
            newErrors.email = 'Emailen skal indeholde @'
        }
        if (!firstname) newErrors.firstname = 'Skriv dit fornavn'
        if (!lastname) newErrors.lastname = 'Skriv dit efternavn'
        if (phone && (phone.length !== 8 || isNaN(phone))) {
            newErrors.phone = 'Telefonnummeret skal være 8 tal'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setServerError('')
        setSucces(false)

        if (!validate()) return

        // Telefon kommer kun med, hvis det er udfyldt
        const aendringer = { email, firstname, lastname }
        if (phone) aendringer.phone = phone

        try {
            // PATCH ændrer kun de felter, vi sender med
            const res = await fetch(`${API_URL}/api/users`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
                body: JSON.stringify(aendringer),
            })

            if (res.status === 401) {
                throw new Error('Dit login er udløbet. Log ind igen for at gemme')
            }
            if (!res.ok) {
                throw new Error('Ændringerne kunne ikke gemmes. Måske bruges emailen af en anden')
            }

            // Opdater navnet i cookien, så "Velkommen [navn]" passer med det samme
            updateUser({ ...user, firstname, lastname })
            setSucces(true)
        } catch (err) {
            setServerError(err.message)
        }
    }

    // Kræver login
    if (!user) {
        return <Navigate to="/Logind" replace />
    }

    return(
        <>
            <MinsideHeader redigerSide={true} />

            <section className={formStyle.Formular}>
                <form className={formStyle.Form} onSubmit={handleSubmit} noValidate>
                    <h2>Rediger profil</h2>

                    {isLoading && <p className={style.Henter}>Henter dine oplysninger...</p>}

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Skriv din email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className={formStyle.Fejl}>{errors.email}</p>}

                    <label htmlFor="firstname">Fornavn</label>
                    <input
                        id="firstname"
                        type="text"
                        placeholder="Skriv dit fornavn..."
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    {errors.firstname && <p className={formStyle.Fejl}>{errors.firstname}</p>}

                    <label htmlFor="lastname">Efternavn</label>
                    <input
                        id="lastname"
                        type="text"
                        placeholder="Skriv dit efternavn..."
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    {errors.lastname && <p className={formStyle.Fejl}>{errors.lastname}</p>}

                    <label htmlFor="phone">Telefon nummer</label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="Skriv dit telefon nummer..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <p className={formStyle.Fejl}>{errors.phone}</p>}

                    {serverError && <p className={formStyle.ServerFejl} role="alert">{serverError}</p>}
                    {succes && <p className={style.Succes} role="status">Dine ændringer er gemt</p>}

                    <button type="submit">Gem ændringer</button>
                </form>
            </section>
        </>
    )
}
