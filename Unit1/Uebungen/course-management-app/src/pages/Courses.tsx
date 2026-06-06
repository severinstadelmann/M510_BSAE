import React, { useState, useMemo } from 'react'
import { Course, getCoursesFromStorage, saveCoursesToStorage, getNextId } from '../data/mockData'

function Courses(): React.ReactElement {
  const [courses, setCourses] = useState<Course[]>(getCoursesFromStorage())
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [showForm, setShowForm] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === 'all' || course.status === filterStatus
      return matchesSearch && matchesFilter
    })
  }, [courses, searchTerm, filterStatus])

  const handleAddCourse = (formData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      id: getNextId(courses),
      ...formData
    }
    const updated = [...courses, newCourse]
    setCourses(updated)
    saveCoursesToStorage(updated)
    setShowForm(false)
  }

  const handleEditCourse = (formData: Omit<Course, 'id'>) => {
    if (!editingCourse) return
    const updated = courses.map(c => c.id === editingCourse.id ? { id: c.id, ...formData } : c)
    setCourses(updated)
    saveCoursesToStorage(updated)
    setEditingCourse(null)
  }

  const handleDeleteCourse = (id: number) => {
    if (confirm('Wirklich löschen?')) {
      const updated = courses.filter(c => c.id !== id)
      setCourses(updated)
      saveCoursesToStorage(updated)
      setSelectedCourse(null)
    }
  }

  return (
    <div>
      <h1 className="page-title">Kurse</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Kurse durchsuchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="filter-select"
        >
          <option value="all">Alle Status</option>
          <option value="active">Aktiv</option>
          <option value="inactive">Inaktiv</option>
        </select>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Kurs hinzufügen
        </button>
      </div>

      {searchTerm && (
        <div style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
          {filteredCourses.length} Kurs(e) gefunden
        </div>
      )}

      <div className="table-container">
        {filteredCourses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <p>Keine Kurse gefunden</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Kurstitel</th>
                <th>Datum</th>
                <th>Dozent</th>
                <th>Kapazität</th>
                <th>Status</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map(course => (
                <tr key={course.id}>
                  <td><strong>{course.title}</strong></td>
                  <td>{new Date(course.date).toLocaleDateString('de-DE')}</td>
                  <td>{course.instructor}</td>
                  <td>{course.capacity}</td>
                  <td>
                    <span className={course.status === 'active' ? 'badge badge-active' : 'badge badge-inactive'}>
                      {course.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-small btn-view"
                        onClick={() => setSelectedCourse(course)}
                      >
                        Details
                      </button>
                      <button
                        className="btn-small btn-edit"
                        onClick={() => setEditingCourse(course)}
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="btn-small btn-delete"
                        onClick={() => handleDeleteCourse(course.id)}
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
      {selectedCourse && (
        <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">{selectedCourse.title}</div>
            <div className="detail-content">
              <div className="detail-row">
                <span className="detail-label">Datum:</span>
                <span className="detail-value">{new Date(selectedCourse.date).toLocaleDateString('de-DE')}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Dozent:</span>
                <span className="detail-value">{selectedCourse.instructor}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Kapazität:</span>
                <span className="detail-value">{selectedCourse.capacity} Plätze</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className="detail-value">
                  <span className={selectedCourse.status === 'active' ? 'badge badge-active' : 'badge badge-inactive'}>
                    {selectedCourse.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                  </span>
                </span>
              </div>
              <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                <p><strong>Beschreibung:</strong></p>
                <p>{selectedCourse.description}</p>
              </div>
            </div>
            <div className="modal-buttons">
              <button className="btn btn-secondary" onClick={() => setSelectedCourse(null)}>Schließen</button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {(showForm || editingCourse) && (
        <CourseForm
          course={editingCourse || undefined}
          onSubmit={editingCourse ? handleEditCourse : handleAddCourse}
          onCancel={() => {
            setShowForm(false)
            setEditingCourse(null)
          }}
        />
      )}
    </div>
  )
}

interface CourseFormProps {
  course?: Course
  onSubmit: (data: Omit<Course, 'id'>) => void
  onCancel: () => void
}

function CourseForm({ course, onSubmit, onCancel }: CourseFormProps): React.ReactElement {
  const [title, setTitle] = useState(course?.title || '')
  const [date, setDate] = useState(course?.date || '')
  const [description, setDescription] = useState(course?.description || '')
  const [instructor, setInstructor] = useState(course?.instructor || '')
  const [capacity, setCapacity] = useState(course?.capacity.toString() || '')
  const [status, setStatus] = useState<'active' | 'inactive'>(course?.status || 'active')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !date || !description || !instructor || !capacity) {
      alert('Bitte füllen Sie alle Felder aus')
      return
    }
    onSubmit({
      title,
      date,
      description,
      instructor,
      capacity: parseInt(capacity),
      status
    })
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">{course ? 'Kurs bearbeiten' : 'Neuer Kurs'}</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Kurstitel</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Datum</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Dozent</label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Kapazität</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="form-input"
              min="1"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Beschreibung</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
              className="form-select"
            >
              <option value="active">Aktiv</option>
              <option value="inactive">Inaktiv</option>
            </select>
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

export default Courses