import { Filtering } from "../../Components/Filtering/Filtering";
import { Kategorijob } from "../../Components/Kategorijob/Kategorijob";
import { NyhedsCards } from "../../Components/NyhedsCards/NyhedsCards";
import { Testimonies } from "../../Components/Testimonies/Testimonies";
import { useFetch } from "../../Hooks/useFetch"
import style from "./Forside.module.scss"

export function Forside() {


        const {
            data: categoriesData,
            isLoading: categoriesLoading,
            error: categoriesError,
            } = useFetch( import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-categories')

        // Alle jobs hentes, så vi kan tælle hvor mange der er i hver kategori
        const { data: jobsData } = useFetch( import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-listings')

        const { data: testimonyData } = useFetch( import.meta.env.VITE_PUBLIC_BASE_URL + '/api/testimony');

        return(
            <>
            {/* React 19 flytter selv <title> op i <head>, så hver side får sin egen titel */}
            <title>Gratissimo - Find dit næste frivillige job</title>
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

            <section className={style.Nyheder}>
                <h2>Udvalgte Nyheder</h2>
                <NyhedsCards antal={3} tilfaeldig={true}/>
            </section>

            <Testimonies testimonyData={testimonyData} />
        </>
    )
}
