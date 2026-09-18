import {BrowserRouter, Routes, Route} from 'react-router'
import { Forside } from './Pages/Forside/Forside'
import { Nyhedsside } from './Pages/NyhedsSide/Nyhedsside'
// import { Søgeresultater } from './Pages/Søgeresultater/Søgeresultater'
import { OpretAnnonce } from './Pages/OpretAnnonce/OpretAnnonce'
import { Mainlayout } from './Layout/Mainlayout'
import { SøgeresultatSidenUdvidet } from './Pages/SøgeresultatSidenUdvidet/SøgeresultatSidenUdvidet'
import { OpretProfil } from './Pages/OpretProfil/OpretProfil'
import { Login } from './Pages/Loginside/Login'
import { MinsideAnnoncevalgt } from './Pages/MinSideAnnoncevalgt/MinsideAnnoncevalgt'
import {MinsideFavoritvalgt} from './Pages/MinSideFavoritvalgt/MinsideFavoritvalgt'
import {MinsideRediger} from './Pages/MinSideRediger/MinsideRediger'
import { Nyheder } from './Pages/Nyheder/Nyheder'

function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
      <Route element={<Mainlayout/>}>
      <Route path="/" element={<Forside/>} />
      <Route path="/Nyhedsside" element={<Nyheder />} />
      <Route path="/Nyhedsside/:id" element={<Nyhedsside />} />
      {/* <Route path="/Søgeresultater" element={<Søgeresultater/>} /> */}
      <Route path="/Søgeresultater/:id" element={<SøgeresultatSidenUdvidet/>} />
      <Route path="/OpretAnnonce" element={<OpretAnnonce/>} />
      <Route path="/Logind" element={<Login/>} />
      <Route path="/OpretProfil" element={<OpretProfil/>} />
      <Route path="/Minannonce" element={<MinsideAnnoncevalgt/>} />
      <Route path="/Minfavoritter" element={<MinsideFavoritvalgt/>} />
      <Route path="/Redigerminside" element={<MinsideRediger/>} />
      </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App