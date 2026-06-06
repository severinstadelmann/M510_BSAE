// src/components/MetricCard.tsx
type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
};

export default function MetricCard({ title, value, subtitle }: Props) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        minWidth: "160px",
        flex: "1",
      }}
    >
      <div style={{ fontSize: "13px", color: "#666", marginBottom: "4px" }}>{title}</div>
      <div style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a1a" }}>{value}</div>
      {subtitle && <div style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>{subtitle}</div>}
    </div>
  );
}