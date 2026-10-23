import { useEffect, useState } from "react";
import style from "./Testimonies.module.scss"

export function Testimonies({testimonyData}) {
    // Hvilken udtalelse der vises lige nu (0 = den første)
    const [TestimonieIndex, setTestimonieIndex] = useState(0)

    // Efter 5 sekunder skiftes til næste udtalelse. Efter den sidste starter den forfra (loop).
    // Effekten kører igen, hver gang index skifter, så der startes en ny 5-sekunders timer.
    useEffect(() => {
        if (!testimonyData) return

        const timer = setTimeout(() => {
            if (TestimonieIndex < testimonyData.length - 1) {
                setTestimonieIndex(TestimonieIndex + 1)
            } else {
                setTestimonieIndex(0)
            }
        }, 5000)

        // Ryd timeren op, hvis index skifter (fx ved klik på en prik) eller siden lukkes
        return () => clearTimeout(timer)
    }, [TestimonieIndex, testimonyData])

    // Intet at vise, før dataen er hentet
    if (!testimonyData || testimonyData.length === 0) return null

    const testimonial = testimonyData[TestimonieIndex]

    return (
        <section className={style.Testimonies}>
            <article>
                <h2>{testimonial.title}</h2>
                <p>{testimonial.content}</p>
                <p className={style.Navn}>{testimonial.name}</p>
            </article>

            {/* En prik pr. udtalelse. Den aktive er rød, og man kan klikke for at skifte */}
            <div className={style.Prikker}>
                {testimonyData.map((item, index) => (
                    <button
                        key={item.id}
                        type="button"
                        aria-label={`Vis udtalelse ${index + 1}`}
                        className={index === TestimonieIndex ? style.Aktiv : ''}
                        onClick={() => setTestimonieIndex(index)}
                    />
                ))}
            </div>
        </section>
    );
}
