import style from './../Filterring/Filtering.module.scss'
import { useFetch } from '../../hooks/useFetch'
import { useState } from 'react';

// set api url'et til et const så det er nemmere at rette og skifte + nemmere at læse koden

const API_URL = import.meta.env.VITE_PUBLIC_BASE_URL

export function Filtering() {
  const [category, setCategory] = useState('')

//   API linket ligger på "job-categories" ikke "categories"

  const { data: categoryData, isLoading, error } = useFetch(`${API_URL}/api/job-categories`)

  console.log(category);

  return (
  <section className={style.Filtersection}>
        <br />
      <h1>Søg frivilligt arbejde</h1>
  
      <br />
      <input type="search" placeholder="Søg" />
      <button>Søg</button>
  <br />
  <br />
  <h3>Filter</h3>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
  
      <option value="">Vælg kategori</option>
  
      {/* Vis "Henter..."" mens at du henter kategorierne og så fjern det når du har hentet dem
      Det er fin til at hvis du har stor api */}

      {isLoading && <option disabled>Henter...</option>}
  
        {/*Error handling den viser simpel bare hvis der er en fejl istedet for hvid skærm */}       

      {error && <option disabled>Kunne ikke hente kategorier</option>}
      
      
      {/* Map over categorierne og lav options for hver så
      tag den første sæt key=categori id
      sæt valuen til det samme
      Sæt selve navnet inde i optionen til categori navnet */}

      
      {categoryData?.map((item) => (
          <option key={item.id} value={item.id}>
          {item.name}
          </option>
      ))}
      </select>
  </section>
  )
}