import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../../Hooks/useFetch'

// "Nyheder" i menuen skal vise en tilfældig nyhed.
// Siden henter alle nyheder, vælger én og sender brugeren videre til den.
export function Nyheder() {
    const navigate = useNavigate()

    const { data, error } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/articles')

    useEffect(() => {
        if (data && data.length > 0) {
            const tilfældigNyhed = data[Math.floor(Math.random() * data.length)]
            // replace betyder at tilbage-knappen ikke kommer tilbage hertil
            navigate(`/Nyhedsside/${tilfældigNyhed.id}`, { replace: true })
        }
    }, [data, navigate])

    if (error) {
        return <p>Nyhederne kunne ikke hentes. Prøv igen senere.</p>
    }

    return <p>Henter nyhed...</p>
}
