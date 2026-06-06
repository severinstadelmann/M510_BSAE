import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketsContext';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import MetricCard from '../components/MetricCard';

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();
  const { tickets } = useTickets();
  const navigate = useNavigate();

  const offeneTickets  = tickets.filter((t) => t.status === 'Offen').length;
  const inBearbeitung  = tickets.filter((t) => t.status === 'In Bearbeitung').length;
  const geschlossene   = tickets.filter((t) => t.status === 'Geschlossen').length;
  const eigeneTickets  = tickets.filter((t) => t.createdBy.id === currentUser?.id).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fafafa' }}>

      <AppHeader
        title="Support App"
        username={currentUser?.name}
        onLogout={handleLogout}
      />

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, padding: '32px 24px' }}>
        <h2 style={{ marginTop: 0, color: '#333333', fontSize: '22px' }}>Übersicht</h2>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <MetricCard title="Offene Tickets"  value={offeneTickets} />
          <MetricCard title="In Bearbeitung"  value={inBearbeitung} />
          <MetricCard title="Geschlossen"     value={geschlossene} />
          <MetricCard title="Meine Tickets"   value={eigeneTickets} />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <PrimaryButton   label="Alle Tickets anzeigen" onClick={() => navigate('/tickets')} />
          <SecondaryButton label="+ Neues Ticket"        onClick={() => navigate('/tickets/new')} />
        </div>
      </div>

      <AppFooter />
    </div>
  );
}