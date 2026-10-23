import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFetch } from "../../Hooks/useFetch";
import style from "./NyhedsCards.module.scss"

// tilfaeldig={true} starter et tilfældigt sted i listen, så forsiden viser forskellige nyheder
export function NyhedsCards({antal, tilfaeldig}) {

  {/* henter data fra apiet */}

  const {data, error} = useFetch(
        import.meta.env.VITE_PUBLIC_BASE_URL + '/api/articles'
    );

    // Et tilfældigt tal mellem 0 og 1. Funktionen i useState kører kun én gang,
    // så tallet (og dermed nyhederne) ikke skifter, hver gang siden tegnes igen
    const [tilfaeldigtTal] = useState(() => Math.random())

    let nyheder = data || []
    if (tilfaeldig && nyheder.length > 0) {
      // Find et tilfældigt startsted og tag nyhederne derfra. % gør at listen starter forfra,
      // så vi altid får nok nyheder, selvom startstedet er tæt på slutningen
      const start = Math.floor(tilfaeldigtTal * nyheder.length)
      nyheder = nyheder.map((item, index) => nyheder[(start + index) % nyheder.length])
    }

    if (error) {
      return <p className={style.Fejl}>Nyhederne kunne ikke hentes. Prøv igen senere.</p>
    }

        {/* her får vi vist dataen vi bruger slice til at få de første (antal) og så map til at få lavet cardsne.
        Uden antal giver slice alle nyhederne */}
   return (
  <div className={style.NyhedsCards}>
    {nyheder.slice(0, antal).map((article) => (
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
