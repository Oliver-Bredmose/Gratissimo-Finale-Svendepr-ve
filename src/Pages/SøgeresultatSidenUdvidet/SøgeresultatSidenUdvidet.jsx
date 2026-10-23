import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../../Hooks/useFetch'
import style from './SøgeresultatSidenUdvidet.module.scss'

// Viser hele jobannoncen, når man trykker "Åben" på søgesiden
export function SøgeresultatSidenUdvidet() {
    // id kommer fra URL'en, fx /Søgeresultater/5
    const { id } = useParams()

    const { data: job, isLoading, error } = useFetch(
        import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-listings/' + id
    )

    return(
        <section className={style.Jobside}>
            <Link to="/Søgeresultater" className={style.Tilbage}>&larr; Tilbage til alle jobs</Link>

            {isLoading && <p>Henter job...</p>}
            {error && <p>Jobbet kunne ikke findes. Det er måske blevet slettet.</p>}

            {job && (
                <article className={style.Kort}>
                    <p className={style.Organisation}>{job.organization}</p>
                    <h1>{job.title}</h1>
                    <p className={style.Beskrivelse}>{job.description}</p>

                    {/* dl er en liste med "navn: værdi", som passer godt til jobinfo */}
                    <dl className={style.Info}>
                        <div><dt>Adresse</dt><dd>{job.address}, {job.zipcode} {job.city}</dd></div>
                        <div><dt>Region</dt><dd>{job.region?.name}</dd></div>
                        <div><dt>Kategori</dt><dd>{job.jobCategory?.name}</dd></div>
                        <div><dt>Arbejdstid</dt><dd>{job.workType?.type}</dd></div>
                        <div><dt>Hjemmearbejde</dt><dd>{job.workHome}</dd></div>
                        <div><dt>Indrykket</dt><dd>{new Date(job.createdAt).toLocaleDateString('da-DK')}</dd></div>
                    </dl>
                </article>
            )}
        </section>
    )
}
