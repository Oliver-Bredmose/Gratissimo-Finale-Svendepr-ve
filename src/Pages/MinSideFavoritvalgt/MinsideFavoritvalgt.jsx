import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useAuth } from "../../Hooks/useAuth"
import { MinsideHeader } from "../../Components/MinsideHeader/MinsideHeader"
import { Jobannonce } from "../../Components/Jobannonce/Jobannonce"
import { Pagination } from "../../Components/Pagination/Pagination"
import style from "../MinSideAnnoncevalgt/MinsideAnnoncevalgt.module.scss"

const API_URL = import.meta.env.VITE_PUBLIC_BASE_URL
// Antal pr. side
const PR_SIDE = 5

export function MinsideFavoritvalgt() {
    const { user } = useAuth()

    const [favoritter, setFavoritter] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    // Hvilken side i pagination man er på
    const [side, setSide] = useState(1)

    // Favoritter kræver login, så accessToken sendes med
    useEffect(() => {
        if (!user) return

        async function hentFavoritter() {
            try {
                const res = await fetch(`${API_URL}/api/favorites`, {
                    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
                })
                if (!res.ok) throw new Error()
                setFavoritter(await res.json())
            } catch {
                setError('Dine favoritter kunne ikke hentes. Prøv igen senere')
            } finally {
                setIsLoading(false)
            }
        }

        hentFavoritter()
    }, [user])

    // id er favoritten (ikke jobbet), fordi API'et sletter favoritter på deres eget id
    async function handleFjern(id) {
        try {
            const res = await fetch(`${API_URL}/api/favorites/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
            })
            if (!res.ok) throw new Error()
            const nyListe = favoritter.filter((favorit) => favorit.id !== id)
            setFavoritter(nyListe)
            // Var det den sidste på siden, går vi en side tilbage
            if (side > 1 && side > Math.ceil(nyListe.length / PR_SIDE)) {
                setSide(side - 1)
            }
        } catch {
            setError('Favoritten kunne ikke fjernes. Prøv igen senere')
        }
    }

    if (!user) {
        return <Navigate to="/Logind" replace />
    }

    // Kun de 5, der hører til den valgte side
    const antalSider = Math.ceil(favoritter.length / PR_SIDE)
    const viste = favoritter.slice((side - 1) * PR_SIDE, side * PR_SIDE)

    function skiftSide(nySide) {
        setSide(nySide)
        document.getElementById('liste').scrollIntoView({ behavior: 'smooth' })
    }

    return(
        <>
            <MinsideHeader />

            <section id="liste" className={style.Liste}>
                {isLoading && <p className={style.Besked}>Henter dine favoritter...</p>}
                {error && <p className={style.Besked} role="alert">{error}</p>}
                {!isLoading && !error && favoritter.length === 0 && (
                    <p className={style.Besked}>Du har ingen favoritter endnu. Tryk "Gem" på et job for at gemme det her.</p>
                )}

                {/* Hver favorit har selve jobbet liggende i favorit.jobListing */}
                {viste.map((favorit) => (
                    <Jobannonce
                        key={favorit.id}
                        id={favorit.jobListing.id}
                        organization={favorit.jobListing.organization}
                        title={favorit.jobListing.title}
                        description={favorit.jobListing.description}
                        city={favorit.jobListing.city}
                        createdAt={favorit.jobListing.createdAt}
                        category={favorit.jobListing.jobCategory?.name}
                        workType={favorit.jobListing.workType?.type}
                        workHome={favorit.jobListing.workHome}
                        address={favorit.jobListing.address}
                        zipcode={favorit.jobListing.zipcode}
                        onFjern={() => handleFjern(favorit.id)}
                    />
                ))}

                <Pagination side={side} antalSider={antalSider} onSkift={skiftSide} />
            </section>
        </>
    )
}
