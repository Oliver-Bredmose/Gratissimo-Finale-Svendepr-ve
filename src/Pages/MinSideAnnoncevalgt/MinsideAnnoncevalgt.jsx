import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useAuth } from "../../Hooks/useAuth"
import { MinsideHeader } from "../../Components/MinsideHeader/MinsideHeader"
import { Jobannonce } from "../../Components/Jobannonce/Jobannonce"
import style from "./MinsideAnnoncevalgt.module.scss"

const API_URL = import.meta.env.VITE_PUBLIC_BASE_URL

export function MinsideAnnoncevalgt() {
    const { user } = useAuth()

    // Annoncerne ligger i et state, så vi kan fjerne en fra listen, når den er slettet
    const [annoncer, setAnnoncer] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

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
            setAnnoncer(annoncer.filter((annonce) => annonce.id !== id))
        } catch {
            setError('Annoncen kunne ikke slettes. Prøv igen senere')
        }
    }

    // Min side kræver login
    if (!user) {
        return <Navigate to="/Logind" replace />
    }

    return(
        <>
            <MinsideHeader />

            <section className={style.Liste}>
                {isLoading && <p className={style.Besked}>Henter dine annoncer...</p>}
                {error && <p className={style.Besked} role="alert">{error}</p>}
                {!isLoading && !error && annoncer.length === 0 && (
                    <p className={style.Besked}>Du har ikke oprettet nogen annoncer endnu.</p>
                )}

                {annoncer.map((job) => (
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
            </section>
        </>
    )
}
