// src/pages/Participants.tsx

import { participantsData, coursesData } from '../data/mockData'

function Participants() {
  // Hilfsfunktion: Kursname anhand der courseId ermitteln
  const getCourseName = (courseId: number): string => {
    const course = coursesData.find(c => c.id === courseId)
    return course ? course.title : 'Unbekannt'
  }

  return (
    <div>
      <h1>Teilnehmende</h1>

      <div className="card">
        <h2>Alle Teilnehmenden</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>E-Mail</th>
              <th>Kurs</th>
            </tr>
          </thead>
          <tbody>
            {participantsData.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{getCourseName(p.courseId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Participants