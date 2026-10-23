import { Link } from 'react-router-dom'
import style from './Kategorijob.module.scss'

// Hele kortet er et link til søgeresultater med kategorien valgt
export function Kategorijob({id, name, antal}) {
    return(
        <Link to={`/Søgeresultater?kategori=${id}`} className={style.Kategorijob}>
            <h3>{name}</h3>
            <p>{antal}</p>
        </Link>
    )
}
