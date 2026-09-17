import { Link } from 'react-router-dom'
import style from './../Katekorijob/Kategorijob.module.scss'

export function Kategorijob({id, name}) {
    return(
        <>
        <section>
        <div className={style.Kategorijob}>
            <span>
                <Link to={`/Søgeresultater?kategori=${id}`}>
                    <h5>{name}</h5>
                </Link>
                <p>{id}</p>
            </span>
        </div>
        </section>
        </>
    )
}