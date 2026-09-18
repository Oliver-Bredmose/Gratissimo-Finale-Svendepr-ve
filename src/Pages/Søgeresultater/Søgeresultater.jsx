import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../../Hooks/useFetch'
import { Filtering } from '../../Components/Filterring/Filtering'

export function Søgeresultater() {
    {/* her bruger vi useparams for at få idet på given kategori */}
    const [searchParams] = useSearchParams()
    const kategori = searchParams.get('kategori')

    const { data: categoriesData } = useFetch(
        import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-categories/' + kategori
    )

    return (
        <>
                {/* her nede får vi dataen vist hvor vi bruger map igne for at få vist det i en article pr job */}
                {/*den viser også de 12 jobs de jobs der er tilgængelige at vælge imellem i dette tilfælde 12  */}
            <Filtering/>
            <h1>{categoriesData?.name}</h1>
            {categoriesData?.jobListings?.map((job) => (
                <article key={job.id}>
                    <p>{job.organization}</p>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <p>Lokation: {job.city}</p>
                </article>
            ))}
        </>
    )
}