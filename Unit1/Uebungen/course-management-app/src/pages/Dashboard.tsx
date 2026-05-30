// src/pages/Dashboard.tsx

import { coursesData, participantsData } from '../data/mockData'

function Dashboard() {
  const activeCourses = coursesData.filter(c => c.status === 'active')

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Statistik-Karten */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="number">{coursesData.length}</div>
          <div className="label">Kurse total</div>
        </div>
        <div className="stat-card">
          <div className="number">{activeCourses.length}</div>
          <div className="label">Aktive Kurse</div>
        </div>
        <div className="stat-card">
          <div className="number">{participantsData.length}</div>
          <div className="label">Teilnehmende</div>
        </div>
      </div>

      {/* Aktive Kurse */}
      <div className="card">
        <h2>Aktive Kurse</h2>
        <table>
          <thead>
            <tr>
              <th>Titel</th>
              <th>Datum</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activeCourses.map(course => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.date}</td>
                <td><span className="badge active">Aktiv</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard