import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../../Hooks/useFetch'

export function Søgeresultater() {
    const [searchParams] = useSearchParams()
    const kategori = searchParams.get('kategori')

    const { data: categoriesData } = useFetch(
        import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-categories/' + kategori
    )

    return (
        <>
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