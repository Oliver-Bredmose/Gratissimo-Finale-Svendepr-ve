import { Filtering } from "../../Components/Filterring/Filtering";
import { Kategorijob } from "../../Components/Katekorijob/katekorijob";
import { NyhedsCards } from "../../Components/NyhedsCards/NyhedsCards";
import { Slider } from "../../Components/Slider/Slider";
import { Testimonies } from "../../Components/Testimonies/Testimonies";
import { useFetch } from "../../Hooks/useFetch"
import { Søgeresultater } from "../Søgeresultater/Søgeresultater";
import style from "./Forside.module.scss"
import { Link } from "react-router-dom"

export function Forside() {


        const {
            data: categoriesData,
            isLoading: categoriesLoading,
            error: categoriesError,
            } = useFetch( import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-categories')

        const {
            data: testimonyData,
            isLoading: testimonyLoading,
            error: testimonyError,
            } = useFetch( import.meta.env.VITE_PUBLIC_BASE_URL + '/api/testimony');
        
        console.log(categoriesData);

        console.log("testimonial: ", testimonyData)

        return(
            <>
        <section className={style.Loginbtn}>
        <h2>Vi hjælper dig på vej til dit næste frivillige job</h2>
        <Link to="/Login">Log ind eller opret dig</Link>
        </section>
            <br />
            <Filtering/>

            <section className={style.Kategorystyle}>
        {categoriesData?.map((item) => {
            return(
                <Kategorijob
                    key={item.id}
                    name={item.name}
                    />
            )
        })}
            </section>
            <Søgeresultater/>
            <section>
                <NyhedsCards antal={3}/>
                <Testimonies testimonyData={testimonyData} />
            </section>
        </>
    )
}