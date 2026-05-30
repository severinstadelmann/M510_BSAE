// src/data/mockData.ts

export interface Course {
  id: number
  title: string
  date: string
  status: 'active' | 'inactive'
  description: string
}

export interface Participant {
  id: number
  name: string
  email: string
  courseId: number
}

export const coursesData: Course[] = [
  {
    id: 1,
    title: 'React Grundlagen',
    date: '2024-03-15',
    status: 'active',
    description: 'Einführung in React mit funktionalen Komponenten.'
  },
  {
    id: 2,
    title: 'TypeScript für Einsteiger',
    date: '2024-04-10',
    status: 'active',
    description: 'Typsicherheit in modernen Web-Projekten.'
  },
  {
    id: 3,
    title: 'CSS & Flexbox',
    date: '2024-02-20',
    status: 'inactive',
    description: 'Moderne Layout-Techniken im Web.'
  },
  {
    id: 4,
    title: 'Node.js Backend',
    date: '2024-05-01',
    status: 'active',
    description: 'Serverseitige Entwicklung mit Node.js und Express.'
  },
  {
    id: 5,
    title: 'Datenbankdesign',
    date: '2024-01-30',
    status: 'inactive',
    description: 'Grundlagen relationaler Datenbanken mit SQL.'
  }
]

export const participantsData: Participant[] = [
  { id: 1, name: 'Anna Müller',    email: 'anna@beispiel.ch',    courseId: 1 },
  { id: 2, name: 'Ben Schneider',  email: 'ben@beispiel.ch',     courseId: 1 },
  { id: 3, name: 'Clara Huber',    email: 'clara@beispiel.ch',   courseId: 2 },
  { id: 4, name: 'David Fischer',  email: 'david@beispiel.ch',   courseId: 2 },
  { id: 5, name: 'Emma Weber',     email: 'emma@beispiel.ch',    courseId: 3 },
  { id: 6, name: 'Felix Keller',   email: 'felix@beispiel.ch',   courseId: 4 },
  { id: 7, name: 'Gina Richter',   email: 'gina@beispiel.ch',    courseId: 4 },
  { id: 8, name: 'Hans Bauer',     email: 'hans@beispiel.ch',    courseId: 5 }
]