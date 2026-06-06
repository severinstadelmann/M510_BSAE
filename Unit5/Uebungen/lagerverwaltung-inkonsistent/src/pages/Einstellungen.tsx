import React, { useState } from 'react';
//import './Einstellungen.css'; --Einstellungen.css wird nicht mehr benötigt – Buttons jetzt als Komponenten
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

// -----------------------------------------------------------------------
// Einstellungen – CSS-Klassen-Buttons statt Inline-Styles (andere Herangehensweise)
// Auch die Karten sehen anders aus als auf Dashboard und Warnungen
// -----------------------------------------------------------------------

const Einstellungen: React.FC = () => {
  const [firma, setFirma] = useState('Muster AG');
  const [email, setEmail] = useState('admin@muster.ch');
  const [minBestand, setMinBestand] = useState('10');
  const [benachrichtigungen, setBenachrichtigungen] = useState(true);
  const [sprache, setSprache] = useState('de');

  // Einheitliches Styling für alle Einstellungs-Karten
  const karteStyle: React.CSSProperties = {
    background: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '24px',
    overflow: 'hidden',
  };

  const karteHeaderStyle: React.CSSProperties = {
    padding: '12px 20px',
    borderBottom: '1px solid #e0e0e0',
    background: '#fafafa',
  };

  const karteBodyStyle: React.CSSProperties = {
    padding: '20px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    color: '#555',
    marginBottom: '6px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ padding: '24px', maxWidth: '720px' }}>
      <h1 style={{ marginBottom: '6px', color: '#333', fontSize: '24px' }}>Einstellungen</h1>
      <p style={{ color: '#777', marginTop: 0, marginBottom: '28px', fontSize: '14px' }}>
        Konfigurieren Sie die Anwendung nach Ihren Bedürfnissen.
      </p>

      {/* Info-Banner – andere Karten-Optik als auf Dashboard */}
     <div style={{
        background: '#e8f5e9',
        borderLeft: '4px solid #43a047',
        borderRadius: '4px',
        padding: '12px 16px',
        marginBottom: '28px',
        fontSize: '14px',
        color: '#2e7d32',
        }}
      >
        Änderungen werden nach dem Klick auf «Sichern» übernommen.
      </div>

      {/* ===== KARTE 1: FIRMENDATEN – flaches Design mit Header-Balken ===== */}
      <div style={karteStyle}>
        <div style={karteHeaderStyle}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Firmendaten</h2>
        </div>
        <div style={karteBodyStyle}>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Firmenname</label>
            <input
              type="text"
              value={firma}
              onChange={(e) => setFirma(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>E-Mail-Adresse</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/*  War: CSS-Klassen «btn-abbrechen» / «btn-sichern» – jetzt einheitliche Komponenten */}
          {/*  War: Beschriftung «Sichern» – jetzt einheitlich «Speichern» */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <SecondaryButton label="Abbrechen" onClick={() => {}} />
            <PrimaryButton   label="Speichern" onClick={() => {}} />
          </div>
        </div>
      </div>

      {/* ===== KARTE 2: LAGER-EINSTELLUNGEN ===== */}
      <div style={karteStyle}>
        <div style={karteHeaderStyle}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Lager-Einstellungen</h2>
        </div>
        <div style={karteBodyStyle}>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Standard-Warnschwelle (Mindestbestand)</label>
            <input
              type="number"
              value={minBestand}
              onChange={(e) => setMinBestand(e.target.value)}
              style={{ ...inputStyle, width: '120px' }}
            />
          </div>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="benachrichtigungen"
              checked={benachrichtigungen}
              onChange={(e) => setBenachrichtigungen(e.target.checked)}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="benachrichtigungen" style={{ fontSize: '14px', color: '#555', cursor: 'pointer' }}>
              Warnmeldungen anzeigen
            </label>
          </div>

          {/* Inline-Style-Button «Speichern» – absichtlich andere Beschriftung als «Sichern» oben */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PrimaryButton label="Speichern" onClick={() => {}} />
          </div>
        </div>
      </div>

      {/* ===== KARTE 3: DARSTELLUNG ===== */}
      <div style={{ ...karteStyle, marginBottom: 0 }}>
        <div style={karteHeaderStyle}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Darstellung</h2>
        </div>
        <div style={karteBodyStyle}>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Sprache</label>
            <select
              value={sprache}
              onChange={(e) => setSprache(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', minWidth: '180px' }}
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>

          {/* War: grüner Outline-Button «Save» – jetzt einheitlicher PrimaryButton «Speichern» */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PrimaryButton label="Speichern" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Einstellungen;
