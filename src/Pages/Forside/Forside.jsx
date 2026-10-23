import { Filtering } from "../../Components/Filterring/Filtering";
import { Kategorijob } from "../../Components/Katekorijob/katekorijob";
import { NyhedsCards } from "../../Components/NyhedsCards/NyhedsCards";
import { Testimonies } from "../../Components/Testimonies/Testimonies";
import { useFetch } from "../../Hooks/useFetch"
import style from "./Forside.module.scss"
import { Link } from "react-router-dom"

export function Forside() {


        const {
            data: categoriesData,
            isLoading: categoriesLoading,
            error: categoriesError,
            } = useFetch( import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-categories')

        // Alle jobs hentes, så vi kan tælle hvor mange der er i hver kategori
        const { data: jobsData } = useFetch( import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-listings')

        const {
            data: testimonyData,
            isLoading: testimonyLoading,
            error: testimonyError,
            } = useFetch( import.meta.env.VITE_PUBLIC_BASE_URL + '/api/testimony');

        return(
            <>
        <section className={style.Loginbtn}>
            <div className={style.container}>
                <h2>Vi hjælper dig på vej til dit næste frivillige job</h2>
                <Link to="/Logind">Log ind eller opret dig</Link>
            </div>
        </section>

            <Filtering/>

            <section className={style.Kategorier}>
                <div className={style.container}>
                    <h2>Find job ved kategori</h2>

                    {categoriesLoading && <p>Henter kategorier...</p>}
                    {categoriesError && <p>Kategorierne kunne ikke hentes. Prøv igen senere.</p>}

                    <div className={style.Kategorystyle}>
                    {categoriesData?.map((item) => {
                        return(
                            <Kategorijob
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                // filter giver de jobs der har samme kategori id, og length er antallet
                                antal={jobsData?.filter((job) => job.jobCategoryId === item.id).length}
                                />
                        )
                    })}
                    </div>
                </div>
            </section>

            <section>
                <NyhedsCards antal={3}/>
                <Testimonies testimonyData={testimonyData} />
            </section>
        </>
    )
}
