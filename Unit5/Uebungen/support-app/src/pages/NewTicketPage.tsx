// src/pages/NewTicketPage.tsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketsContext';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

export default function NewTicketPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { addTicket } = useTickets();

  const navState = location.state as { prefill?: { title: string; description: string } } | null;
  const prefill = navState?.prefill;

  const [title, setTitle] = useState(prefill?.title ?? '');
  const [description, setDescription] = useState(prefill?.description ?? '');
  const [priority, setPriority] = useState('Mittel');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTicket = {
      id: String(Date.now()),
      title,
      description,
      priority: priority as 'Niedrig' | 'Mittel' | 'Hoch',
      status: 'Offen' as const,
      createdBy: {
        id: currentUser?.id ?? 'unbekannt',
        name: currentUser?.name ?? 'Unbekannt',
      },
      createdAt: new Date().toISOString(),
    };

    addTicket(newTicket);
    navigate('/tickets');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9f9f9' }}>

      <AppHeader
        title="Support App / Neues Ticket"
        username={currentUser?.name}
        onLogout={handleLogout}
      />

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        padding: '32px',
        maxWidth: '620px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'white',
            padding: '28px',
            borderRadius: '6px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '24px', color: '#222222', fontSize: '18px' }}>
            Neues Ticket anlegen
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#444444' }}>
              Titel *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Kurze Beschreibung des Problems"
              style={{
                width: '100%',
                padding: '9px',
                border: '1px solid #cccccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#444444' }}>
              Beschreibung
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Detaillierte Beschreibung des Problems..."
              style={{
                width: '100%',
                padding: '9px',
                border: '1px solid #cccccc',
                borderRadius: '4px',
                fontSize: '14px',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#444444' }}>
              Priorität
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{
                width: '100%',
                padding: '9px',
                border: '1px solid #cccccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            >
              <option value="Niedrig">Niedrig</option>
              <option value="Mittel">Mittel</option>
              <option value="Hoch">Hoch</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <PrimaryButton   label="Erstellen"  onClick={() => {}} type="submit" />
            <SecondaryButton label="Abbrechen"  onClick={() => navigate('/tickets')} />
          </div>
        </form>
      </div>

      <AppFooter />
    </div>
  );
}