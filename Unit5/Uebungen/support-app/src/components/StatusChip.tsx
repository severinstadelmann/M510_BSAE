type Status =
  | "Offen"
  | "In Bearbeitung"
  | "Geschlossen"
  | "Kritisch"
  | "Warnung"
  | "OK"
  | "Inaktiv"
  | "Nicht verfügbar"
  | "Aktiv"
  | "Pausiert";

type Props = {
  status: Status;
};

const statusConfig: Record<Status, { bg: string; color: string }> = {
  "Offen":           { bg: "#e3f2fd", color: "#1565c0" },
  "In Bearbeitung":  { bg: "#fff8e1", color: "#f57f17" },
  "Geschlossen":     { bg: "#e8f5e9", color: "#2e7d32" },
  "Kritisch":        { bg: "#fdecea", color: "#c62828" },
  "Warnung":         { bg: "#fff8e1", color: "#f57f17" },
  "OK":              { bg: "#e8f5e9", color: "#2e7d32" },
  "Inaktiv":         { bg: "#f5f5f5", color: "#757575" },
  "Nicht verfügbar": { bg: "#fdecea", color: "#b71c1c" },
  "Aktiv":           { bg: "#e8f5e9", color: "#2e7d32" },
  "Pausiert":        { bg: "#f5f5f5", color: "#757575" },
};

export default function StatusChip({ status }: Props) {
  const config = statusConfig[status];

    // Absicherung falls Status unbekannt:
  if (!config) {
    return <span style={{ fontSize: '12px', color: '#999' }}>{status}</span>;
  }
  
  return (
    <span
      style={{
        backgroundColor: config.bg,
        color: config.color,
        padding: "3px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: 600,
        display: "inline-block",
      }}
    >
      {status}
    </span>
  );
}