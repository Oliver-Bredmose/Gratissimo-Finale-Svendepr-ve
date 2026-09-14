import style from "./Forside.module.scss"

export function Forside() {

    return(
        <>

        <section >
            <h2>Vi hjælper dig på vej til dit næste frivillige job</h2>

            <button>Log ind eller opret dig</button>
        </section>


        <section className={style.Filtersection}>

        <h1>Søg Frigvillig arbejde</h1>
        
        </section>
        
        </>
    )
}