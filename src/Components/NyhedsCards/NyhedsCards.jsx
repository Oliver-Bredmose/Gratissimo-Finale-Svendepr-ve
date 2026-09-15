import { useFetch } from "../../Hooks/useFetch";

export function NyhedsCards({}) {

    const {data, isLoading, error} = useFetch(
        import.meta.env.VITE_PUBLIC_BASE_URL + '/api/articles'
    );

    console.log(data)
    

   return (
    <div>
      {data?.map((article) => (
        <article key={article.id}>
          <figure>
            <img src={article.image} alt={'Nyhed'} />
          </figure>
          <section>
            <h6>{article.createdAt}- {article.author}</h6> 
            <h4>{article.title}</h4>
            
          </section>
        </article>
      ))}
    </div>
  );
}