import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../../Hooks/useFetch'
import { Filtering } from '../../Components/Filterring/Filtering'
import { Jobannonce } from '../../Components/Jobannonce/Jobannonce'
import { Pagination } from '../../Components/Pagination/Pagination'
import style from './Søgeresultater.module.scss'

// Antal jobannoncer pr. side
const PR_SIDE = 5

export function Søgeresultater() {
    // her bruger vi useSearchParams for at læse søgeord og filtre fra URL'en
    const [searchParams, setSearchParams] = useSearchParams()
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

    // Pagination: sidetallet ligger i URL'en, fx ?side=2. Uden side er man på side 1.
    // En ny søgning laver en ny URL uden side, så man starter forfra på side 1
    const side = Number(searchParams.get('side')) || 1
    const antalSider = Math.ceil(jobs.length / PR_SIDE)
    // slice tager kun de 5 jobs, der hører til siden. Side 2 = job nr. 5 til 9
    const visteJobs = jobs.slice((side - 1) * PR_SIDE, side * PR_SIDE)

    function skiftSide(nySide) {
        // Kopiér søgningen fra URL'en og skift kun sidetallet
        const nyeParams = new URLSearchParams(searchParams)
        nyeParams.set('side', nySide)
        setSearchParams(nyeParams)
        // Scroll op til starten af listen
        document.getElementById('resultater').scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            {/* key gør at filtrene starter forfra, når URL'en skifter (fx ved klik på "Alle Jobs") */}
            <Filtering key={searchParams.toString()} />

            <section id="resultater" className={style.Resultater}>
                {isLoading && <p className={style.Besked}>Henter jobs...</p>}
                {error && <p className={style.Besked}>Jobbene kunne ikke hentes. Prøv igen senere.</p>}
                {jobsData && jobs.length === 0 && (
                    <p className={style.Besked}>Ingen jobs matcher din søgning. Prøv at fjerne nogle filtre.</p>
                )}

                {/* her nede får vi dataen vist hvor vi bruger map igen for at få vist en article pr job */}
                {visteJobs.map((job) => (
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
                    />
                ))}

                <Pagination side={side} antalSider={antalSider} onSkift={skiftSide} />
            </section>
        </>
    )
}
