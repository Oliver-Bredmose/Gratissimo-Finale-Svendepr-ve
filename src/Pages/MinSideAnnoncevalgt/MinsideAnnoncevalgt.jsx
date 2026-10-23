import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useAuth } from "../../Hooks/useAuth"
import { MinsideHeader } from "../../Components/MinsideHeader/MinsideHeader"
import { Jobannonce } from "../../Components/Jobannonce/Jobannonce"
import { Pagination } from "../../Components/Pagination/Pagination"
import style from "./MinsideAnnoncevalgt.module.scss"

const API_URL = import.meta.env.VITE_PUBLIC_BASE_URL
// Antal pr. side
const PR_SIDE = 5

export function MinsideAnnoncevalgt() {
    const { user } = useAuth()

    // Annoncerne ligger i et state, så vi kan fjerne en fra listen, når den er slettet
    const [annoncer, setAnnoncer] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    // Hvilken side i pagination man er på
    const [side, setSide] = useState(1)

    // Henter alle jobs og beholder kun dem, brugeren selv har oprettet
    useEffect(() => {
        if (!user) return

        async function hentAnnoncer() {
            try {
                const res = await fetch(`${API_URL}/api/job-listings`)
                if (!res.ok) throw new Error()
                const jobs = await res.json()
                setAnnoncer(jobs.filter((job) => job.userId === user.id))
            } catch {
                setError('Dine annoncer kunne ikke hentes. Prøv igen senere')
            } finally {
                setIsLoading(false)
            }
        }

        hentAnnoncer()
    }, [user])

    async function handleSlet(id) {
        // confirm viser en "Er du sikker?"-boks, så man ikke sletter ved et uheld
        if (!window.confirm('Er du sikker på, at du vil slette annoncen?')) return

        try {
            const res = await fetch(`${API_URL}/api/job-listings/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
            })
            if (!res.ok) throw new Error()
            // Fjern annoncen fra listen uden at hente det hele igen
            const nyListe = annoncer.filter((annonce) => annonce.id !== id)
            setAnnoncer(nyListe)
            // Var det den sidste på siden, går vi en side tilbage
            if (side > 1 && side > Math.ceil(nyListe.length / PR_SIDE)) {
                setSide(side - 1)
            }
        } catch {
            setError('Annoncen kunne ikke slettes. Prøv igen senere')
        }
    }

    // Min side kræver login
    if (!user) {
        return <Navigate to="/Logind" replace />
    }

    // Kun de 5, der hører til den valgte side
    const antalSider = Math.ceil(annoncer.length / PR_SIDE)
    const viste = annoncer.slice((side - 1) * PR_SIDE, side * PR_SIDE)

    function skiftSide(nySide) {
        setSide(nySide)
        document.getElementById('liste').scrollIntoView({ behavior: 'smooth' })
    }

    return(
        <>
            <MinsideHeader />

            <section id="liste" className={style.Liste}>
                {isLoading && <p className={style.Besked}>Henter dine annoncer...</p>}
                {error && <p className={style.Besked} role="alert">{error}</p>}
                {!isLoading && !error && annoncer.length === 0 && (
                    <p className={style.Besked}>Du har ikke oprettet nogen annoncer endnu.</p>
                )}

                {viste.map((job) => (
                    <Jobannonce
                        key={job.id}
                        id={job.id}
                        organization={job.organization}
                        title={job.title}
                        description={job.description}
                        city={job.city}
                        createdAt={job.createdAt}
                        category={job.jobCategory?.name}
                        workType={job.workType?.type}
                        workHome={job.workHome}
                        address={job.address}
                        zipcode={job.zipcode}
                        onSlet={() => handleSlet(job.id)}
                    />
                ))}

                <Pagination side={side} antalSider={antalSider} onSkift={skiftSide} />
            </section>
        </>
    )
}
