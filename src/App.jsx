import {BrowserRouter, Routes, Route} from 'react-router'
import { Forside } from './Pages/Forside/Forside'
import { Nyhedsside } from './Pages/NyhedsSide/Nyhedsside'
import { Søgeresultater } from './Pages/Søgeresultater/Søgeresultater'
import { OpretAnnonce } from './Pages/OpretAnnonce/OpretAnnonce'
import { Mainlayout } from './Layout/Mainlayout'
import { SøgeresultatSidenUdvidet } from './Pages/SøgeresultatSidenUdvidet/SøgeresultatSidenUdvidet'
import { Login } from './Pages/Loginside/Login'
import { MinsideAnnoncevalgt } from './Pages/MinSideAnnoncevalgt/MinsideAnnoncevalgt'
import {MinsideFavoritvalgt} from './Pages/MinSideFavoritvalgt/MinsideFavoritvalgt'
import {MinsideRediger} from './Pages/MinSideRediger/MinsideRediger'
import { Nyheder } from './Pages/Nyheder/Nyheder'
import { AuthProvider } from './Context/AuthProvider'

function App() {
  

  return (
    <>
     {/* AuthProvider deler login med alle sider */}
     <AuthProvider>
     <BrowserRouter>
      <Routes>
      <Route element={<Mainlayout/>}>
      <Route path="/" element={<Forside/>} />
      <Route path="/Nyhedsside" element={<Nyheder />} />
      <Route path="/Nyhedsside/:id" element={<Nyhedsside />} />
      <Route path="/Søgeresultater" element={<Søgeresultater/>} />
      <Route path="/Søgeresultater/:id" element={<SøgeresultatSidenUdvidet/>} />
      <Route path="/OpretAnnonce" element={<OpretAnnonce/>} />
      <Route path="/Logind" element={<Login/>} />
      {/* Log ind og Opret profil er samme side. Login-siden ser på URL'en, hvilken formular der vises */}
      <Route path="/OpretProfil" element={<Login/>} />
      <Route path="/Minannonce" element={<MinsideAnnoncevalgt/>} />
      <Route path="/Minfavoritter" element={<MinsideFavoritvalgt/>} />
      <Route path="/Redigerminside" element={<MinsideRediger/>} />
      </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App