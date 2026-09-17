import { useEffect, useState } from "react"

export function useFetch(url){
    const [data, setData] = useState(null)
    const [error, setError] = useState(null) 
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            try{
                const res = await fetch(url)
                if (!res.ok){
                    throw new Error('Failed to fetch:' + res.status)
                }
                const json = await res.json()
                setData(json);
            } catch(err) {
                setError(err)
            }
            finally {
                setIsLoading(false)
            }
        } 

        getData()
    },[url])
    return{data, isLoading, error};
}