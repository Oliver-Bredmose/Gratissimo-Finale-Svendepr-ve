import { Link } from 'react-router-dom'
import style from './../Katekorijob/Kategorijob.module.scss'

export function Kategorijob({id, name}) {
    return(
        <>
        <section className={style.Kategorijob}>
                <Link to={`/Søgeresultater?kategori=${id}`}>
                    <h5>{name}</h5>
                </Link>
                <p>{id}</p>
        </section>
        </>
    )
}