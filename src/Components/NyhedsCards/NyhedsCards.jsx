import { NavLink } from "react-router-dom";
import { useFetch } from "../../Hooks/useFetch";
import style from "./NyhedsCards.module.scss"

export function NyhedsCards({antal}) {

  {/* henter data fra apiet */}

  const {data, error} = useFetch(
        import.meta.env.VITE_PUBLIC_BASE_URL + '/api/articles'
    );

    if (error) {
      return <p className={style.Fejl}>Nyhederne kunne ikke hentes. Prøv igen senere.</p>
    }

        {/* her får vi vist dataen vi bruger slice til at få de første (antal) og så map til at få lavet cardsne.
        Uden antal giver slice alle nyhederne */}
   return (
  <div className={style.NyhedsCards}>
    {data?.slice(0, antal).map((article) => (
      <NavLink key={article.id} to={`/Nyhedsside/${article.id}`}>
        <article>
          <figure>
            <img src={`${import.meta.env.VITE_PUBLIC_BASE_URL}${article.imageUrl}`} alt={''} />
          </figure>
          <section>
                      {/* her gør vi sådan at der bliver skået ned til kun at vise datoen ved hjælp af "T" og fjerner klokkeslæt med [0] */}
            <p className={style.Dato}>d. {article.createdAt.split("T")[0].split("-").slice(1).reverse().join("/")} - {article.author}</p>
            <h3>{article.title}</h3>
          </section>
        </article>
        {/* Jeg har wrappet cardsne i et navlink så det er muligt at trykke på et af cardsne og så føre det ind på cardet hvor man kan læse mere */}
      </NavLink>
    ))}
  </div>
);
}
