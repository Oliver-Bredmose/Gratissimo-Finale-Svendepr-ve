import { useFetch } from "../../Hooks/useFetch";
import style from "./NyhedsCards.module.scss"

export function NyhedsCards() {

  const {data} = useFetch(
        import.meta.env.VITE_PUBLIC_BASE_URL + '/api/articles'
    );

    console.log(data)
    

   return (
    <div className={style.NyhedsCards}>
      {data?.slice(0, 3).map((article) => (
        <article key={article.id}>
          <figure>
            <img src={`http://localhost:4000${article.imageUrl}`} alt={''} />
          </figure>
          <section>
            <h6> {article.createdAt.split("T")[0].split("-").slice(1).reverse().join("/")}- {article.author}</h6>
            <h4>{article.title}</h4>
          </section>
        </article>
      ))}
    </div>
  );
}