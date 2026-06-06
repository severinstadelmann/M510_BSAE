import React, { useState, useMemo } from 'react'
import { Participant, Course, getParticipantsFromStorage, getCoursesFromStorage, saveParticipantsToStorage, getNextId } from '../data/mockData'

function Participants(): React.ReactElement {
  const [participants, setParticipants] = useState<Participant[]>(getParticipantsFromStorage())
  const [courses] = useState<Course[]>(getCoursesFromStorage())
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCourse, setFilterCourse] = useState<number | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'completed'>('all')
  const [showForm, setShowForm] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null)
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null)

  const filteredParticipants = useMemo(() => {
    return participants.filter(participant => {
      const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           participant.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCourse = filterCourse === 'all' || participant.courseId === filterCourse
      const matchesStatus = filterStatus === 'all' || participant.status === filterStatus
      return matchesSearch && matchesCourse && matchesStatus
    })
  }, [participants, searchTerm, filterCourse, filterStatus])

  const getCourseTitle = (courseId: number): string => {
    const course = courses.find(c => c.id === courseId)
    return course ? course.title : 'Unbekannter Kurs'
  }

  const handleAddParticipant = (formData: Omit<Participant, 'id'>) => {
    const newParticipant: Participant = {
      id: getNextId(participants),
      ...formData
    }
    const updated = [...participants, newParticipant]
    setParticipants(updated)
    saveParticipantsToStorage(updated)
    setShowForm(false)
  }

  const handleEditParticipant = (formData: Omit<Participant, 'id'>) => {
    if (!editingParticipant) return
    const updated = participants.map(p => p.id === editingParticipant.id ? { id: p.id, ...formData } : p)
    setParticipants(updated)
    saveParticipantsToStorage(updated)
    setEditingParticipant(null)
  }

  const handleDeleteParticipant = (id: number) => {
    if (confirm('Wirklich löschen?')) {
      const updated = participants.filter(p => p.id !== id)
      setParticipants(updated)
      saveParticipantsToStorage(updated)
      setSelectedParticipant(null)
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'badge-active'
      case 'completed': return 'badge-completed'
      case 'inactive': return 'badge-inactive'
      default: return 'badge-inactive'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv'
      case 'completed': return 'Abgeschlossen'
      case 'inactive': return 'Inaktiv'
      default: return status
    }
  }

  return (
    <div>
      <h1 className="page-title">Teilnehmende</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Nach Name oder E-Mail durchsuchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
          className="filter-select"
        >
          <option value="all">Alle Kurse</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="filter-select"
        >
          <option value="all">Alle Status</option>
          <option value="active">Aktiv</option>
          <option value="completed">Abgeschlossen</option>
          <option value="inactive">Inaktiv</option>
        </select>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Teilnehmenden hinzufügen
        </button>
      </div>

      {searchTerm && (
        <div style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
          {filteredParticipants.length} Teilnehmende gefunden
        </div>
      )}

      <div className="table-container">
        {filteredParticipants.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <p>Keine Teilnehmenden gefunden</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>E-Mail</th>
                <th>Kurs</th>
                <th>Status</th>
                <th>Anmeldedatum</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map(participant => (
                <tr key={participant.id}>
                  <td><strong>{participant.name}</strong></td>
                  <td>{participant.email}</td>
                  <td>{getCourseTitle(participant.courseId)}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeColor(participant.status)}`}>
                      {getStatusLabel(participant.status)}
                    </span>
                  </td>
                  <td>{new Date(participant.enrollmentDate).toLocaleDateString('de-DE')}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-small btn-view"
                        onClick={() => setSelectedParticipant(participant)}
                      >
                        Details
                      </button>
                      <button
                        className="btn-small btn-edit"
                        onClick={() => setEditingParticipant(participant)}
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="btn-small btn-delete"
                        onClick={() => handleDeleteParticipant(participant.id)}
                      >
                        Löschen
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Modal */}
      {selectedParticipant && (
        <div className="modal-overlay" onClick={() => setSelectedParticipant(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">{selectedParticipant.name}</div>
            <div className="detail-content">
              <div className="detail-row">
                <span className="detail-label">E-Mail:</span>
                <span className="detail-value">{selectedParticipant.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Kurs:</span>
                <span className="detail-value">{getCourseTitle(selectedParticipant.courseId)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className="detail-value">
                  <span className={`badge ${getStatusBadgeColor(selectedParticipant.status)}`}>
                    {getStatusLabel(selectedParticipant.status)}
                  </span>
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Anmeldedatum:</span>
                <span className="detail-value">{new Date(selectedParticipant.enrollmentDate).toLocaleDateString('de-DE')}</span>
              </div>
            </div>
            <div className="modal-buttons">
              <button className="btn btn-secondary" onClick={() => setSelectedParticipant(null)}>Schließen</button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {(showForm || editingParticipant) && (
        <ParticipantForm
          participant={editingParticipant || undefined}
          courses={courses}
          onSubmit={editingParticipant ? handleEditParticipant : handleAddParticipant}
          onCancel={() => {
            setShowForm(false)
            setEditingParticipant(null)
          }}
        />
      )}
    </div>
  )
}

interface ParticipantFormProps {
  participant?: Participant
  courses: Course[]
  onSubmit: (data: Omit<Participant, 'id'>) => void
  onCancel: () => void
}

function ParticipantForm({ participant, courses, onSubmit, onCancel }: ParticipantFormProps): React.ReactElement {
  const [name, setName] = useState(participant?.name || '')
  const [email, setEmail] = useState(participant?.email || '')
  const [courseId, setCourseId] = useState(participant?.courseId.toString() || '')
  const [status, setStatus] = useState<'active' | 'inactive' | 'completed'>(participant?.status || 'active')
  const [enrollmentDate, setEnrollmentDate] = useState(participant?.enrollmentDate || new Date().toISOString().split('T')[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !courseId) {
      alert('Bitte füllen Sie alle erforderlichen Felder aus')
      return
    }
    if (!email.includes('@')) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein')
      return
    }
    onSubmit({
      name,
      email,
      courseId: parseInt(courseId),
      status,
      enrollmentDate
    })
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">{participant ? 'Teilnehmenden bearbeiten' : 'Neue Teilnehmende'}</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">E-Mail *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Kurs *</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="form-select"
            >
              <option value="">-- Kurs wählen --</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="form-select"
            >
              <option value="active">Aktiv</option>
              <option value="completed">Abgeschlossen</option>
              <option value="inactive">Inaktiv</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Anmeldedatum</label>
            <input
              type="date"
              value={enrollmentDate}
              onChange={(e) => setEnrollmentDate(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="modal-buttons">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Abbrechen</button>
            <button type="submit" className="btn btn-primary">Speichern</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Participants