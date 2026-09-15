import style from './../Katekorijob/Kategorijob.module.scss'


export function Kategorijob({id, name}) {

    return(
        
        <div className={style.Kategorijob}>
            <span>
                <h5>{name}</h5> <p>{id}</p>
            </span>
        </div>

    )
}