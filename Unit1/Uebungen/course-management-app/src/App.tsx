// src/App.tsx

import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import Participants from './pages/Participants'

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">

        {/* Sidebar Navigation */}
        <nav className="sidebar">
          <h2>📚 KursApp</h2>
          <NavLink to="/"            end>Dashboard</NavLink>
          <NavLink to="/courses"         >Kurse</NavLink>
          <NavLink to="/participants"    >Teilnehmende</NavLink>
        </nav>

        {/* Seiteninhalt */}
        <main className="main-content">
          <Routes>
            <Route path="/"             element={<Dashboard />}    />
            <Route path="/courses"      element={<Courses />}      />
            <Route path="/participants" element={<Participants />}  />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App