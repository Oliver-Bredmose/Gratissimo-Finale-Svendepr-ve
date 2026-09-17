import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../../Hooks/useFetch'


export function Søgeresultater() {

const {
            data: categoriesData,
            isLoading: categoriesLoading,
            error: categoriesError,
            } = useFetch( import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-categories/id')

    const [searchParams] = useSearchParams()
    const kategori = searchParams.get('kategori')
    console.log(kategori)

    return <h1>Søgeresultater for kategori {kategori}</h1>
}