import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "./../../Hooks/useFetch";
import { NyhedsCards } from "../../Components/NyhedsCards/NyhedsCards";
import style from "./Nyhedsside.module.scss"

export function Nyhedsside() {
    // id kommer fra URL'en, fx /Nyhedsside/3
    const { id } = useParams()

    const {data, isLoading, error} = useFetch(
        import.meta.env.VITE_PUBLIC_BASE_URL + '/api/articles/' + id
    );

    // Når man klikker på en anden nyhed, skifter id, og siden scroller til toppen
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

        return (
            <>
                <section className={style.NyhedsSide}>
                    {isLoading && <p className={style.Besked}>Henter nyhed...</p>}
                    {error && <p className={style.Besked}>Nyheden kunne ikke findes.</p>}

                    {data && (
                        <article>
                            <figure>
                                <img src={`${import.meta.env.VITE_PUBLIC_BASE_URL}${data.imageUrl}`} alt="" />
                            </figure>
                            <div className={style.Tekst}>
                                <h1>{data.title}</h1>
                                {/* samme dato-metode som i NyhedsCards: fjerner klokkeslæt og vender til dag/måned */}
                                <p className={style.Dato}>
                                    d. {data.createdAt.split("T")[0].split("-").slice(1).reverse().join("/")} af {data.author}
                                </p>
                                <p className={style.Indhold}>{data.content}</p>
                            </div>
                        </article>
                    )}
                </section>

                <section className={style.AlleNyheder}>
                    <h2>Alle Nyheder</h2>
                    {/* uden antal viser NyhedsCards alle nyheder */}
                    <NyhedsCards />
                </section>
            </>
          );
}
