// src/components/SecondaryButton.tsx
type Props = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function SecondaryButton({ label, onClick, disabled = false }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: "transparent",
        color: "#1976d2",
        padding: "8px 20px",
        border: "2px solid #1976d2",
        borderRadius: "6px",
        fontSize: "14px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {label}
    </button>
  );
}