import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Home from "./Pages/Home"
import Replay from "./Pages/Replay"
import Programs from "./Pages/Programs"
import About from "./Pages/About"
import Gallery from "./Pages/Gallery"
import Articles from "./Pages/Articles"
import ArticleDetails from './Pages/ArticleDetails'
import League from './Pages/League';
import LeagueDetail from './Pages/LeagueDetail';
import FooterComponent from './Components/FooterComponent'
import Header from './Components/Header'
import Dashboard from './Admin/Dashboard'
import Article from './Admin/Board/Blog'
import Highlight from './Admin/Board/Highlight'
import Schedule from './Admin/Board/Schedule'
import AdminProgram from './Admin/Board/Program'
import AdminLeague from './Admin/League/index';
import LeagueDetailPage from './Admin/League/LeagueDetailPage';
import LiveTV from './Pages/LiveTV';
import AdminGallery from './Admin/Gallery';
import AdminLive from './Admin/Board/Live';

function App() {
  return (
    <>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Header />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/programs' element={<Programs />} />
                <Route path='/replay' element={<Replay />} />
                <Route path='/about' element={<About />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/articles' element={<Articles />} />
                <Route path='/league' element={<League />} />
                <Route path='/leaguedetail/:leagueId' element={<LeagueDetail />} />
                <Route path='/articles/:id' element={<ArticleDetails />} />
                <Route path='/livetv' element={<LiveTV />} />

                 <Route path='/dashboard' element={<Dashboard />} />
                 <Route path='/adminleague' element={<AdminLeague />} />
                 <Route path='/adminleaguedetail/:leagueId' element={<LeagueDetailPage />} />
                  <Route path='/adminprogram' element={<AdminProgram />} />
                  <Route path='/adminarticle' element={<Article />} />
                  <Route path='/adminvideo' element={<Highlight />} />
                  <Route path='/adminschedule' element={<Schedule />} />
                  <Route path='/admingallery' element={<AdminGallery />} />
                  <Route path='/adminlive' element={<AdminLive />} />

              </Routes>
            <FooterComponent />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </>
  )
}

export default App
