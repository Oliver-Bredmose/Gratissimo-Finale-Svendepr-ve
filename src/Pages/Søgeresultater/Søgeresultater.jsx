import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../../Hooks/useFetch'
import { Filtering } from '../../Components/Filterring/Filtering'
import { Jobannonce } from '../../Components/Jobannonce/Jobannonce'
import style from './Søgeresultater.module.scss'

export function Søgeresultater() {
    // her bruger vi useSearchParams for at læse søgeord og filtre fra URL'en
    const [searchParams] = useSearchParams()
    const tekst = searchParams.get('tekst')
    const region = searchParams.get('region')
    const kategori = searchParams.get('kategori')
    const arbejdstid = searchParams.get('arbejdstid')
    const periode = searchParams.get('periode')
    const hjemmearbejde = searchParams.get('hjemmearbejde')

    // Vi henter alle jobs én gang og filtrerer dem her i frontenden
    const { data: jobsData, isLoading, error } = useFetch(
        import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-listings'
    )

    // Uden søgning og filtre vises alle jobs ("Alle Jobs" i menuen)
    // Hvert filter herunder fjerner de jobs, der ikke passer
    let jobs = jobsData || []

    // Fritekst søger i både overskrift og beskrivelse
    if (tekst) {
        const søgeord = tekst.toLowerCase()
        jobs = jobs.filter((job) =>
            job.title.toLowerCase().includes(søgeord) ||
            job.description.toLowerCase().includes(søgeord)
        )
    }

    // Værdierne i URL'en er tekst, så de laves om til tal med Number()
    if (region) {
        jobs = jobs.filter((job) => job.regionId === Number(region))
    }
    if (kategori) {
        jobs = jobs.filter((job) => job.jobCategoryId === Number(kategori))
    }
    if (arbejdstid) {
        jobs = jobs.filter((job) => job.workTypeId === Number(arbejdstid))
    }
    if (hjemmearbejde) {
        jobs = jobs.filter((job) => job.workHome === hjemmearbejde)
    }

    // Periode er antal dage. Vi finder datoen for fx 7 dage siden
    // og beholder kun jobs, der er oprettet efter den
    if (periode) {
        const fraDato = new Date()
        fraDato.setDate(fraDato.getDate() - Number(periode))
        jobs = jobs.filter((job) => new Date(job.createdAt) >= fraDato)
    }

    // Nyeste jobs øverst
    jobs = [...jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return (
        <>
            {/* key gør at filtrene starter forfra, når URL'en skifter (fx ved klik på "Alle Jobs") */}
            <Filtering key={searchParams.toString()} />

            <section className={style.Resultater}>
                {isLoading && <p className={style.Besked}>Henter jobs...</p>}
                {error && <p className={style.Besked}>Jobbene kunne ikke hentes. Prøv igen senere.</p>}
                {jobsData && jobs.length === 0 && (
                    <p className={style.Besked}>Ingen jobs matcher din søgning. Prøv at fjerne nogle filtre.</p>
                )}

                {/* her nede får vi dataen vist hvor vi bruger map igen for at få vist en article pr job */}
                {jobs.map((job) => (
                    <Jobannonce
                        key={job.id}
                        id={job.id}
                        organization={job.organization}
                        title={job.title}
                        description={job.description}
                        city={job.city}
                        createdAt={job.createdAt}
                    />
                ))}
            </section>
        </>
    )
}
