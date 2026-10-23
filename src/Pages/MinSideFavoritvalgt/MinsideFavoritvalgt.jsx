import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useAuth } from "../../Hooks/useAuth"
import { MinsideHeader } from "../../Components/MinsideHeader/MinsideHeader"
import { Jobannonce } from "../../Components/Jobannonce/Jobannonce"
import style from "../MinSideAnnoncevalgt/MinsideAnnoncevalgt.module.scss"

const API_URL = import.meta.env.VITE_PUBLIC_BASE_URL

export function MinsideFavoritvalgt() {
    const { user } = useAuth()

    const [favoritter, setFavoritter] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

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
            setFavoritter(favoritter.filter((favorit) => favorit.id !== id))
        } catch {
            setError('Favoritten kunne ikke fjernes. Prøv igen senere')
        }
    }

    if (!user) {
        return <Navigate to="/Logind" replace />
    }

    return(
        <>
            <MinsideHeader />

            <section className={style.Liste}>
                {isLoading && <p className={style.Besked}>Henter dine favoritter...</p>}
                {error && <p className={style.Besked} role="alert">{error}</p>}
                {!isLoading && !error && favoritter.length === 0 && (
                    <p className={style.Besked}>Du har ingen favoritter endnu. Tryk "Gem" på et job for at gemme det her.</p>
                )}

                {/* Hver favorit har selve jobbet liggende i favorit.jobListing */}
                {favoritter.map((favorit) => (
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
            </section>
        </>
    )
}
