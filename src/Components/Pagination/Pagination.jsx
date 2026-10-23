import style from './Pagination.module.scss'
import backIcon from '../../assets/icons/icons8-back-30.png'
import forwardIcon from '../../assets/icons/icons8-forward-30.png'

// side = den side man er på, antalSider = hvor mange sider der er,
// onSkift = funktion der kaldes med det nye sidetal
export function Pagination({ side, antalSider, onSkift }) {
    // Ingen pagination, hvis alt kan være på én side
    if (antalSider <= 1) return null

    // Vis højst 8 sidetal ad gangen, med den aktuelle side cirka i midten
    let start = Math.max(1, side - 3)
    const slut = Math.min(antalSider, start + 7)
    start = Math.max(1, slut - 7)

    const sidetal = []
    for (let i = start; i <= slut; i++) {
        sidetal.push(i)
    }

    return (
        <nav className={style.Pagination} aria-label="Sider">
            <button
                type="button"
                className={style.Pil}
                onClick={() => onSkift(side - 1)}
                disabled={side === 1}
                aria-label="Forrige side"
            >
                <img src={backIcon} alt="" />
            </button>

            {sidetal.map((tal) => (
                <button
                    key={tal}
                    type="button"
                    className={tal === side ? style.Aktiv : ''}
                    onClick={() => onSkift(tal)}
                    aria-current={tal === side ? 'page' : undefined}
                >
                    {tal}
                </button>
            ))}

            <button
                type="button"
                className={style.Pil}
                onClick={() => onSkift(side + 1)}
                disabled={side === antalSider}
                aria-label="Næste side"
            >
                <img src={forwardIcon} alt="" />
            </button>
        </nav>
    )
}
