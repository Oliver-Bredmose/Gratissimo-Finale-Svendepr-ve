import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../Hooks/useAuth"
import style from "./Login.module.scss"

const API_URL = import.meta.env.VITE_PUBLIC_BASE_URL

export function OpretBrugerForm() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordGentag, setPasswordGentag] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState('')

    // Samme idé som i LoginForm: én fejlbesked pr. felt
    function validate() {
        const newErrors = {}
        if (!email) {
            newErrors.email = 'Skriv din email'
        } else if (!email.includes('@')) {
            newErrors.email = 'Emailen skal indeholde @'
        }
        if (password.length < 6) {
            newErrors.password = 'Password skal være mindst 6 tegn'
        }
        if (passwordGentag !== password) {
            newErrors.passwordGentag = 'De to passwords er ikke ens'
        }
        if (!firstname) newErrors.firstname = 'Skriv dit fornavn'
        if (!lastname) newErrors.lastname = 'Skriv dit efternavn'
        // Telefon er valgfrit, men skrives det, skal det være 8 tal
        if (phone && (phone.length !== 8 || isNaN(phone))) {
            newErrors.phone = 'Telefonnummeret skal være 8 tal'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setServerError('')

        if (!validate()) return

        // Telefon kommer kun med, hvis det er udfyldt
        const nyBruger = { email, password, firstname, lastname }
        if (phone) nyBruger.phone = phone

        try {
            const res = await fetch(`${API_URL}/api/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nyBruger),
            })

            if (!res.ok) {
                // Emailen skal være unik, så den mest sandsynlige fejl er, at den findes i forvejen
                throw new Error('Profilen kunne ikke oprettes. Måske findes emailen allerede')
            }

            // Profilen er oprettet, så vi logger ind med det samme og går til Min side
            await login(email, password)
            navigate('/Minannonce')
        } catch (err) {
            setServerError(err.message)
        }
    }

    return(
        <form className={style.Form} onSubmit={handleSubmit} noValidate>
            <h2>Opret ny profil</h2>

            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                placeholder="Skriv din email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className={style.Fejl}>{errors.email}</p>}

            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                placeholder="Skriv dit password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className={style.Fejl}>{errors.password}</p>}

            <label htmlFor="passwordGentag">Gentag password</label>
            <input
                id="passwordGentag"
                type="password"
                placeholder="Skriv dit password..."
                value={passwordGentag}
                onChange={(e) => setPasswordGentag(e.target.value)}
            />
            {errors.passwordGentag && <p className={style.Fejl}>{errors.passwordGentag}</p>}

            <label htmlFor="firstname">Fornavn</label>
            <input
                id="firstname"
                type="text"
                placeholder="Skriv dit fornavn..."
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
            />
            {errors.firstname && <p className={style.Fejl}>{errors.firstname}</p>}

            <label htmlFor="lastname">Efternavn</label>
            <input
                id="lastname"
                type="text"
                placeholder="Skriv dit efternavn..."
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
            />
            {errors.lastname && <p className={style.Fejl}>{errors.lastname}</p>}

            <label htmlFor="phone">Telefon nummer</label>
            <input
                id="phone"
                type="tel"
                placeholder="Skriv dit telefon nummer..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className={style.Fejl}>{errors.phone}</p>}

            {serverError && <p className={style.ServerFejl} role="alert">{serverError}</p>}

            <button type="submit">Opret profil</button>

            <Link to="/Logind" className={style.Skift}>Log ind</Link>
        </form>
    )
}
