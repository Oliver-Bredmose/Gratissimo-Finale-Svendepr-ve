import {BrowserRouter, Routes, Route} from 'react-router'
import { Forside } from './Pages/Forside/Forside'
import { Nyhedsside } from './Pages/Nyheds-Side/Nyheds-side'
import { Søgeresultater } from './Pages/Søgeresultater/Søgeresultater'
import { Navbar } from './Components/Navbar/Navbar'


function App() {
  

  return (
    <>
     <BrowserRouter>
    <Navbar/>
      <Routes>
      <Route path="/" element={<Forside/>} />
      <Route path="/Nyheder" element={<Nyhedsside/>} />
      <Route path="/classdetails/:id" element={<Søgeresultater/>} />
      {/* <Route path="/search" element={<Search />} />
      <Route path="/myschedule" element={<MySchedule />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App