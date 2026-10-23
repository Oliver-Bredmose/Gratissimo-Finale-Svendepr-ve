import style from './../Filterring/Filtering.module.scss'
import { useFetch } from '../../Hooks/useFetch'
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import searchIcon from '../../assets/icons/icons8-search-50.png'

// set api url'et til et const så det er nemmere at rette og skifte + nemmere at læse koden

const API_URL = import.meta.env.VITE_PUBLIC_BASE_URL

export function Filtering() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Et state til søgefeltet og et til hvert filter
  // Startværdien hentes fra URL'en, så søgningen står der stadig på søgesiden
  const [tekst, setTekst] = useState(searchParams.get('tekst') || '')
  const [region, setRegion] = useState(searchParams.get('region') || '')
  const [category, setCategory] = useState(searchParams.get('kategori') || '')
  const [arbejdstid, setArbejdstid] = useState(searchParams.get('arbejdstid') || '')
  const [periode, setPeriode] = useState(searchParams.get('periode') || '')
  const [hjemmearbejde, setHjemmearbejde] = useState(searchParams.get('hjemmearbejde') || '')

//   API linket ligger på "job-categories" ikke "categories"

  const { data: categoryData, isLoading, error } = useFetch(`${API_URL}/api/job-categories`)
  const { data: regionData } = useFetch(`${API_URL}/api/regions`)
  const { data: workTypeData } = useFetch(`${API_URL}/api/workTypes`)

  // Når man trykker Søg, bygger vi en URL med søgeord og filtre
  // fx /Søgeresultater?tekst=café&region=1
  function handleSubmit(e) {
    e.preventDefault() // stopper siden i at genindlæse

    const params = new URLSearchParams()
    if (tekst) params.append('tekst', tekst)
    if (region) params.append('region', region)
    if (category) params.append('kategori', category)
    if (arbejdstid) params.append('arbejdstid', arbejdstid)
    if (periode) params.append('periode', periode)
    if (hjemmearbejde) params.append('hjemmearbejde', hjemmearbejde)

    navigate(`/Søgeresultater?${params.toString()}`)
  }

  // Nulstil sætter søgefelt og alle filtre tilbage til tomme
  function handleReset() {
    setTekst('')
    setRegion('')
    setCategory('')
    setArbejdstid('')
    setPeriode('')
    setHjemmearbejde('')
  }

  return (
  <section className={style.Filtersection}>
    <form className={style.container} onSubmit={handleSubmit}>
      <h1>Søg frivilligt arbejde:</h1>

      <div className={style.Searchbar}>
        <img src={searchIcon} alt="" />
        <input
          type="search"
          placeholder="Eks. cafémedhjælper..."
          aria-label="Søg efter frivilligt arbejde"
          value={tekst}
          onChange={(e) => setTekst(e.target.value)}
        />
        <button type="submit">Søg</button>
      </div>

      <div className={style.Filters}>
        <span>Filtrer:</span>

        <select aria-label="Region" value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">Region</option>
          {regionData?.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>

        <select aria-label="Kategori" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Kategorier</option>

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

        <select aria-label="Arbejdstid" value={arbejdstid} onChange={(e) => setArbejdstid(e.target.value)}>
          <option value="">Arbejdstid</option>
          {workTypeData?.map((item) => (
            <option key={item.id} value={item.id}>{item.type}</option>
          ))}
        </select>

        {/* Periode er antal dage tilbage, så det er nemt at regne med på søgesiden */}
        <select aria-label="Periode" value={periode} onChange={(e) => setPeriode(e.target.value)}>
          <option value="">Periode</option>
          <option value="7">Seneste uge</option>
          <option value="30">Seneste måned</option>
          <option value="365">Seneste år</option>
        </select>

        {/* Værdierne er de samme som workHome i API'et */}
        <select aria-label="Hjemmearbejde" value={hjemmearbejde} onChange={(e) => setHjemmearbejde(e.target.value)}>
          <option value="">Hjemmearbejde</option>
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <button type="button" className={style.Reset} onClick={handleReset}>Nulstil</button>
      </div>
    </form>
  </section>
  )
}
