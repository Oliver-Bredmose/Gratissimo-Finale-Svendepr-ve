import { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import style from './Footer.module.scss'
import { useAuth } from '../../Hooks/useAuth'
import facebookIcon from '../../assets/icons/SoMe/Facebook.png'
import googleIcon from '../../assets/icons/SoMe/Google Plus.png'
import instagramIcon from '../../assets/icons/SoMe/Instagram Circle.png'
import linkedinIcon from '../../assets/icons/SoMe/LinkedIn Circled.png'

export function Footer() {
    const { user } = useAuth()
    const [email, setEmail] = useState('')
    // Vises hvis man prøver at tilmelde sig uden at være logget ind
    const [visLoginBesked, setVisLoginBesked] = useState(false)
    // Besked efter tilmelding, fx "Tak for din tilmelding"
    const [besked, setBesked] = useState('')

    // API'et kræver login for at tilmelde nyhedsbrevet (Bearer-token)
    async function handleSubmit(e) {
        e.preventDefault()
        setBesked('')
        setVisLoginBesked(false)

        if (!email.includes('@')) {
            setBesked('Skriv en gyldig email')
            return
        }
        if (!user) {
            setVisLoginBesked(true)
            return
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_PUBLIC_BASE_URL}/api/newsletter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
                body: JSON.stringify({ email }),
            })
            // Emailen skal være unik, så en fejl betyder oftest, at den allerede er tilmeldt
            if (!res.ok) throw new Error('Emailen kunne ikke tilmeldes. Måske er den allerede tilmeldt')

            setBesked('Tak! Du er nu tilmeldt vores nyhedsbrev')
            setEmail('')
        } catch (err) {
            setBesked(err.message)
        }
    }

    return (
        <footer className={style.footerStyle}>
            <div className={style.container}>
                <section>
                    <h3>For jobsøgere</h3>
                    <ul>
                        <li><Link to="/Minannonce">Din kundeside</Link></li>
                        <li><Link to="/OpretProfil">Opret profil</Link></li>
                        <li><Link to="/Minfavoritter">Gemte jobs</Link></li>
                    </ul>
                </section>

                <section>
                    <h3>For arbejdsgivere</h3>
                    <ul>
                        <li>Virksomhedsprofil</li>
                        <li><Link to="/OpretAnnonce">Opret annonce</Link></li>
                        <li>Jobannoncering</li>
                        <li>Rekruttering</li>
                    </ul>
                </section>

                <section>
                    <h3>Links</h3>
                    <ul>
                        <li>Om Gratissimo</li>
                        <li>Job hos os</li>
                        <li>For investorer</li>
                        <li>Presse</li>
                    </ul>
                </section>

                <section className={style.Nyhedsbrev}>
                    <h3>Vil du have jobs direkte i din indbakke?</h3>
                    <p>Tilmeld dig vores elektroniske nyhedsbrev</p>

                    <form onSubmit={handleSubmit} noValidate>
                        <input
                            type="email"
                            aria-label="Din email"
                            placeholder="@  Indtast email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit">Tilmeld</button>
                    </form>

                    {visLoginBesked && (
                        <p className={style.Besked} role="alert">
                            Du skal være logget ind for at tilmelde dig. <Link to="/Logind">Log ind her</Link>
                        </p>
                    )}
                    {besked && <p className={style.Besked} role="status">{besked}</p>}
                </section>

                <section className={style.Kontakt}>
                    <address>
                        Fidusvej 23<br />
                        9230 Øster Lundby<br />
                        +45 22 13 22 13
                    </address>
                    <div className={style.SoMe}>
                        <img src={linkedinIcon} alt="LinkedIn" />
                        <img src={facebookIcon} alt="Facebook" />
                        <img src={instagramIcon} alt="Instagram" />
                        <img src={googleIcon} alt="Google+" />
                    </div>
                </section>
            </div>
        </footer>
    )
}
