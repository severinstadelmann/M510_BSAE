import React from 'react';
import { artikel } from '../data/mockData';
import PrimaryButton from '../components/PrimaryButton';
import StatusChip from '../components/StatusChip';
import MetricCard from '../components/MetricCard';

// -----------------------------------------------------------------------
// Warnungen – absichtlich wieder andere Button- und Status-Darstellung
// -----------------------------------------------------------------------

const Warnungen: React.FC = () => {
  const kritisch = artikel.filter((a) => a.status === 'kritisch');
  const nichtVerfuegbar = artikel.filter((a) => a.status === 'nicht-verfügbar');
  const gesamtWarnungen = kritisch.length + nichtVerfuegbar.length;

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '6px', color: '#b71c1c', fontSize: '24px' }}>
        ⚠ Warnungen
      </h1>
      <p style={{ color: '#777', marginTop: 0, marginBottom: '28px', fontSize: '14px' }}>
        {gesamtWarnungen} Artikel erfordern sofortige Aufmerksamkeit
      </p>

      {/* ===== STATISTIK-KARTEN – absichtlich anders als auf Dashboard ===== */}
      {/* Dashboard: gefüllte Karten · Warnungen: nur Rahmen, riesige Zahlen */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '36px', flexWrap: 'wrap' }}>
        <MetricCard title="Kritisch" value={kritisch.length} />
        <MetricCard title="Nicht verfügbar" value={nichtVerfuegbar.length} />
      </div>

      {/* ===== KRITISCHE ARTIKEL ===== */}
      <section style={{ marginBottom: '36px' }}>
        <h2 style={{ marginBottom: '14px', fontSize: '17px', color: '#e65100', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ⚠ Kritischer Bestand ({kritisch.length})
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {kritisch.map((a) => (
            <div
              key={a.id}
              style={{
                background: '#fff8e1',
                border: '1px solid #ffe082',
                borderRadius: '6px',
                padding: '14px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>{a.name}</div>
                <div style={{ fontSize: '13px', color: '#777' }}>
                  Bestand: <strong style={{ color: '#e65100' }}>{a.bestand}</strong> / Min: {a.minBestand} · Lager {a.lagerort}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* ✅ War: farbiger Text in Grossbuchstaben – jetzt einheitlicher StatusChip */}
                <StatusChip status="kritisch" />

                {/* ✅ War: oranger, eckiger Button mit Uppercase – jetzt einheitlicher PrimaryButton */}
                <PrimaryButton label="Bestellen" onClick={() => { }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== NICHT VERFÜGBARE ARTIKEL ===== */}
       <section>
        <h2 style={{ marginBottom: '14px', fontSize: '17px', color: '#d32f2f', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ✗ Nicht verfügbar ({nichtVerfuegbar.length})
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {nichtVerfuegbar.map((a) => (
            <div
              key={a.id}
              style={{
                background: '#ffebee',
                border: '1px solid #ef9a9a',
                borderRadius: '6px',
                padding: '14px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>{a.name}</div>
                <div style={{ fontSize: '13px', color: '#777' }}>
                  Bestand: <strong style={{ color: '#d32f2f' }}>0</strong> / Min: {a.minBestand} · Lager {a.lagerort}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* ✅ War: schwarze Box "Ausverkauft" – jetzt einheitlicher StatusChip */}
                <StatusChip status="nicht-verfügbar" />

                {/* ✅ War: runder Button "Jetzt bestellen" – jetzt gleicher PrimaryButton wie oben */}
                <PrimaryButton label="Bestellen" onClick={() => {}} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Warnungen;
