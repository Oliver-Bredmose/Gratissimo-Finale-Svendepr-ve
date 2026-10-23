import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../Hooks/useAuth"
import style from "./Login.module.scss"

export function LoginForm() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // errors holder en fejlbesked pr. felt, fx { email: 'Skriv din email' }
    const [errors, setErrors] = useState({})
    // serverError er fejl fra API'et, fx forkert password
    const [serverError, setServerError] = useState('')

    // Tjekker felterne og gemmer fejlbeskeder. Giver true, hvis alt er udfyldt rigtigt
    function validate() {
        const newErrors = {}
        if (!email) {
            newErrors.email = 'Skriv din email'
        } else if (!email.includes('@')) {
            newErrors.email = 'Emailen skal indeholde @'
        }
        if (!password) {
            newErrors.password = 'Skriv dit password'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setServerError('')

        if (!validate()) return

        try {
            await login(email, password)
            navigate('/Minannonce') // efter login går man til Min side
        } catch (err) {
            setServerError(err.message)
        }
    }

    return(
        // noValidate slår browserens egne beskeder fra, så vores egne vises i stedet
        <form className={style.Form} onSubmit={handleSubmit} noValidate>
            <h2>Log ind</h2>

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

            {serverError && <p className={style.ServerFejl} role="alert">{serverError}</p>}

            <button type="submit">Log ind</button>

            <Link to="/OpretProfil" className={style.Skift}>Opret bruger</Link>
        </form>
    )
}
