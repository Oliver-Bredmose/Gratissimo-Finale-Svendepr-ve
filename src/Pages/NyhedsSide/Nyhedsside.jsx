import { useFetch } from "./../../Hooks/useFetch";
import style from "./Nyhedsside.module.scss"

export function Nyhedsside() {

const {data} = useFetch(
        import.meta.env.VITE_PUBLIC_BASE_URL + '/api/articles/1'
    );

    console.log(data)
    
        return (
            <div className={style.NyhedsSide}>
                {data && (
                    <article>
                        <figure>
                            <img src={`http://localhost:4000${data.imageUrl}`} alt="" />
                        </figure>
                        <h4>d{data.title}</h4>
                        <section>
                         <h6>
                            {data.createdAt.split("T")[0].split("-").slice(1).reverse().join("/")} -
                        {data.author}
                         </h6>
                         <p>{data.content}</p>
                        </section>
                    </article>
                )}



            </div>
          );
}