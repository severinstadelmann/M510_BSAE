import React from 'react'
// TODO: Import der Artikeldaten einkommentieren, sobald die Tabelle implementiert wird
 import { articles } from '../data/mockData'

// Artikelseite - zeigt alle Artikel in einer Tabelle an
function Articles(): React.ReactElement {
  return (
<div>
      <h1 className="page-title">Artikel</h1>
      <p className="page-subtitle">Alle Lagerartikel im Überblick</p>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Artikelnummer</th>
              <th>Kategorie</th>
              <th>Lagerort</th>
              <th>Bestand</th>
              <th>Mindestbestand</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr
                key={article.id}
                className={article.stock <= article.minStock ? 'row-critical' : ''}
              >
                <td>{article.name}</td>
                <td className="text-mono">{article.articleNumber}</td>
                <td>{article.category}</td>
                <td className="text-mono">{article.location}</td>
                <td className={article.stock <= article.minStock ? 'text-danger' : ''}>
                  {article.stock}
                </td>
                <td>{article.minStock}</td>
                <td>{article.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Articles
