import { useState } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import { useAuth } from "../../Hooks/useAuth"
import { useFetch } from "../../Hooks/useFetch"
import style from "./OpretAnnonce.module.scss"

const API_URL = import.meta.env.VITE_PUBLIC_BASE_URL

// Alle felter starter tomme. Bruges også til at tømme formularen efter oprettelse
const tomFormular = {
    title: '',
    organization: '',
    regionId: '',
    jobCategoryId: '',
    workTypeId: '',
    workHome: '',
    address: '',
    zipcode: '',
    city: '',
    description: '',
}

export function OpretAnnonce() {
    const { user } = useAuth()

    // Hele formularen ligger i ét objekt i stedet for 10 forskellige states
    const [form, setForm] = useState(tomFormular)
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState('')
    const [succes, setSucces] = useState(false)

    const { data: regionData } = useFetch(`${API_URL}/api/regions`)
    const { data: categoryData } = useFetch(`${API_URL}/api/job-categories`)
    const { data: workTypeData } = useFetch(`${API_URL}/api/workTypes`)

    // Én funktion til alle felter. name på feltet bestemmer, hvilken værdi der ændres
    // fx name="title" opdaterer form.title
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // Tjekker alle felter og laver en fejlbesked til dem, der mangler
    function validate() {
        const newErrors = {}
        if (!form.title) newErrors.title = 'Skriv en overskrift'
        if (!form.organization) newErrors.organization = 'Skriv navnet på din organisation eller forening'
        if (!form.regionId) newErrors.regionId = 'Vælg en lokation'
        if (!form.jobCategoryId) newErrors.jobCategoryId = 'Vælg en kategori'
        if (!form.workTypeId) newErrors.workTypeId = 'Vælg arbejdstid'
        if (!form.workHome) newErrors.workHome = 'Vælg hjemmearbejde'
        if (!form.address) newErrors.address = 'Skriv en adresse'
        // Et dansk postnummer er 4 tal
        if (form.zipcode.length !== 4 || isNaN(form.zipcode)) newErrors.zipcode = 'Postnummer skal være 4 tal'
        if (!form.city) newErrors.city = 'Skriv en by'
        if (!form.description) newErrors.description = 'Skriv en beskrivelse af jobbet'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setServerError('')
        setSucces(false)

        if (!validate()) return

        try {
            const res = await fetch(`${API_URL}/api/job-listings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
                // ...form tager alle felterne, og userId fortæller hvem der ejer annoncen
                body: JSON.stringify({ ...form, userId: user.id }),
            })

            if (res.status === 401) {
                throw new Error('Dit login er udløbet. Log ind igen for at oprette annoncen')
            }
            if (!res.ok) {
                throw new Error('Annoncen kunne ikke oprettes. Prøv igen senere')
            }

            setSucces(true)
            setForm(tomFormular)
        } catch (err) {
            setServerError(err.message)
        }
    }

    return(
        <>
            <title>Opret annonce | Gratissimo</title>
            <section className={style.Intro}>
                <h1>Opret en annonce og find frivillige til din forening</h1>
                <p>
                    Gratissimo er gratis for alle. Frivillige, organisationer og foreninger. Du skaber det
                    frivillige liv og vi formidler kontakten. Når du har fundet en frivillig til din forening,
                    kan du blot fjerne annoncen igen ved at gå til din side.
                </p>
                <Link to="/Minannonce">Gå til min side</Link>
            </section>

            <section className={style.Indhold}>
                {/* Uden login vises en besked i stedet for formularen */}
                {!user ? (
                    <div className={style.LoginBesked}>
                        <h2>Du skal være logget ind for at oprette en annonce</h2>
                        <Link to="/Logind">Log ind eller opret dig</Link>
                    </div>
                ) : (
                    <form className={style.Form} onSubmit={handleSubmit} noValidate>
                        <div className={style.Felter}>
                            <label htmlFor="title">Overskrift</label>
                            <input id="title" name="title" type="text" placeholder="Eks. Mågejæger søges..." value={form.title} onChange={handleChange} />
                            {errors.title && <p className={style.Fejl}>{errors.title}</p>}

                            <label htmlFor="organization">Organisation / forening</label>
                            <input id="organization" name="organization" type="text" placeholder="Skriv din forening her..." value={form.organization} onChange={handleChange} />
                            {errors.organization && <p className={style.Fejl}>{errors.organization}</p>}

                            <label htmlFor="regionId">Lokation</label>
                            <select id="regionId" name="regionId" value={form.regionId} onChange={handleChange}>
                                <option value="">Vælg lokation...</option>
                                {regionData?.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {errors.regionId && <p className={style.Fejl}>{errors.regionId}</p>}

                            <label htmlFor="jobCategoryId">Kategori</label>
                            <select id="jobCategoryId" name="jobCategoryId" value={form.jobCategoryId} onChange={handleChange}>
                                <option value="">Vælg kategori...</option>
                                {categoryData?.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {errors.jobCategoryId && <p className={style.Fejl}>{errors.jobCategoryId}</p>}

                            <label htmlFor="workTypeId">Arbejdstid</label>
                            <select id="workTypeId" name="workTypeId" value={form.workTypeId} onChange={handleChange}>
                                <option value="">Vælg arbejdstid...</option>
                                {workTypeData?.map((item) => (
                                    <option key={item.id} value={item.id}>{item.type}</option>
                                ))}
                            </select>
                            {errors.workTypeId && <p className={style.Fejl}>{errors.workTypeId}</p>}

                            {/* Ikke i designet, men API'et kræver det, og søgefilteret bruger det */}
                            <label htmlFor="workHome">Hjemmearbejde</label>
                            <select id="workHome" name="workHome" value={form.workHome} onChange={handleChange}>
                                <option value="">Vælg hjemmearbejde...</option>
                                <option value="On-site">On-site</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                            {errors.workHome && <p className={style.Fejl}>{errors.workHome}</p>}

                            <label htmlFor="address">Adresse</label>
                            <input id="address" name="address" type="text" placeholder="Eks. Holmegade 22, 1. sal" value={form.address} onChange={handleChange} />
                            {errors.address && <p className={style.Fejl}>{errors.address}</p>}

                            <label htmlFor="zipcode">Postnummer</label>
                            <input id="zipcode" name="zipcode" type="text" inputMode="numeric" placeholder="Eks. 9200" value={form.zipcode} onChange={handleChange} />
                            {errors.zipcode && <p className={style.Fejl}>{errors.zipcode}</p>}

                            <label htmlFor="city">By</label>
                            <input id="city" name="city" type="text" placeholder="Eks. Aalborg SV" value={form.city} onChange={handleChange} />
                            {errors.city && <p className={style.Fejl}>{errors.city}</p>}
                        </div>

                        <div className={style.Beskrivelse}>
                            <label htmlFor="description">Job beskrivelse</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Her kan du beskrive jobbet, hvilke erfaringer der kræves og hvad der forventes af den frivillige..."
                                value={form.description}
                                onChange={handleChange}
                            />
                            {errors.description && <p className={style.Fejl}>{errors.description}</p>}
                        </div>

                        <div className={style.Bund}>
                            {serverError && <p className={style.ServerFejl} role="alert">{serverError}</p>}
                            {succes && (
                                <p className={style.Succes} role="status">
                                    Din annonce er oprettet! <Link to="/Minannonce">Se den på Min side</Link>
                                </p>
                            )}
                            <button type="submit">Opret annonce</button>
                        </div>
                    </form>
                )}
            </section>
        </>
    )
}
