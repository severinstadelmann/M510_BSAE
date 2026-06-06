// src/components/StatusChip.tsx
type Status = "kritisch" | "warnung" | "ok" | "inaktiv";

type Props = {
  status: Status;
};

const statusConfig: Record<Status, { label: string; bg: string; color: string }> = {
  "kritisch":        { label: "Kritisch",        bg: "#fdecea", color: "#c62828" },
  "warnung":         { label: "Warnung",         bg: "#fff8e1", color: "#f57f17" },
  "ok":              { label: "OK",              bg: "#e8f5e9", color: "#2e7d32" },
  "inaktiv":         { label: "Inaktiv",         bg: "#f5f5f5", color: "#757575" },
  "nicht-verfügbar": { label: "Nicht verfügbar", bg: "#fdecea", color: "#b71c1c" },
  "aktiv":           { label: "Aktiv",           bg: "#e8f5e9", color: "#2e7d32" },  
  "pausiert":        { label: "Pausiert",        bg: "#f5f5f5", color: "#757575" },  
};

export default function StatusChip({ status }: Props) {
  const config = statusConfig[status];
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
      {config.label}
    </span>
  );
}