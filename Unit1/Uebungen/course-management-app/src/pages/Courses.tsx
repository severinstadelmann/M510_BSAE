// src/pages/Courses.tsx

import { coursesData } from '../data/mockData'

function Courses() {
  return (
    <div>
      <h1>Kurse</h1>

      <div className="card">
        <h2>Alle Kurse</h2>
        <table>
          <thead>
            <tr>
              <th>Titel</th>
              <th>Beschreibung</th>
              <th>Datum</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {coursesData.map(course => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>{course.date}</td>
                <td>
                  <span className={`badge ${course.status}`}>
                    {course.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Courses