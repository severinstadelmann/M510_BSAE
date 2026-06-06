import React, { useState, useMemo } from 'react'
import { Course, Participant, getCoursesFromStorage, getParticipantsFromStorage, getParticipantCountByCourse } from '../data/mockData'

function Dashboard(): React.ReactElement {
  const [courses] = useState<Course[]>(getCoursesFromStorage())
  const [participants] = useState<Participant[]>(getParticipantsFromStorage())

  // Statistiken
  const stats = useMemo(() => {
    const activeParticipants = participants.filter(p => p.status === 'active').length
    const completedCourses = courses.filter(c => c.status === 'inactive').length
    
    return {
      totalCourses: courses.length,
      activeCourses: courses.filter(c => c.status === 'active').length,
      inactiveCourses: completedCourses,
      totalParticipants: participants.length,
      activeParticipants,
      completedParticipants: participants.filter(p => p.status === 'completed').length
    }
  }, [courses, participants])

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="stat-box">
          <div className="stat-number">{stats.totalCourses}</div>
          <div className="stat-label">Gesamtkurse</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{stats.activeCourses}</div>
          <div className="stat-label">Aktive Kurse</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{stats.totalParticipants}</div>
          <div className="stat-label">Teilnehmende</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{stats.activeParticipants}</div>
          <div className="stat-label">Aktive Teilnehmende</div>
        </div>
      </div>

      <h2 style={{ marginTop: '40px', marginBottom: '20px', color: '#2c3e50', fontSize: '20px' }}>
        Aktuelle Kurse mit Teilnehmerzahl
      </h2>
      
      <div className="cards-container">
        {courses
          .filter(course => course.status === 'active')
          .map(course => (
            <div key={course.id} className="card">
              <div className="card-title">{course.title}</div>
              <div className="card-content">
                <p><strong>Datum:</strong> {new Date(course.date).toLocaleDateString('de-DE')}</p>
                <p><strong>Dozent:</strong> {course.instructor}</p>
                <p><strong>Kapazität:</strong> {getParticipantCountByCourse(course.id, participants)} / {course.capacity}</p>
                <p>{course.description}</p>
                <div className="badge badge-active">Aktiv</div>
              </div>
            </div>
          ))}
      </div>

      <h2 style={{ marginTop: '40px', marginBottom: '20px', color: '#2c3e50', fontSize: '20px' }}>
        Weitere Informationen
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        Diese Lösung der Kursverwaltungs-App enthält alle Funktionen einer vollständigen Business-Applikation:
      </p>
      <ul style={{ color: '#666', lineHeight: '1.8', marginLeft: '20px', marginTop: '10px' }}>
        <li>✅ Suchfunktion für Kurse und Teilnehmende</li>
        <li>✅ Filterfunktion nach Status und anderen Kriterien</li>
        <li>✅ Detailansichten für jeden Kurs und jeden Teilnehmenden</li>
        <li>✅ Anzeige von Teilnehmerstatus</li>
        <li>✅ Anzahl Teilnehmende pro Kurs</li>
        <li>✅ CRUD-Operationen (Hinzufügen, Bearbeiten, Löschen)</li>
        <li>✅ LocalStorage zur persistenten Datenspeicherung</li>
        <li>✅ Validierung von Eingaben</li>
      </ul>
    </div>
  )
}

export default Dashboard