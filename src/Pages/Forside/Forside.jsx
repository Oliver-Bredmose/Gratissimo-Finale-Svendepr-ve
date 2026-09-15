import { Kategorijob } from "../../Components/Katekorijob/katekorijob";
import { NyhedsCards } from "../../Components/NyhedsCards/NyhedsCards";
import { useFetch } from "../../Hooks/useFetch"
import style from "./Forside.module.scss"

export function Forside() {


        const {data, isLoading, error} = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-categories')
        
        
        console.log(data);
        return(
            <>
        <section >
            <h2>Vi hjælper dig på vej til dit næste frivillige job</h2> 
            <button>Log ind eller opret dig</button>
        </section>

            <section className={style.Kategorystyle}>
        {data?.map((item) => {
            return(
                <Kategorijob
                    id={item.id}
                    name={item.name}
                    />
            )
        })}
            </section>

            <section>
                <NyhedsCards/>
            </section>
        </>
    )
}
    