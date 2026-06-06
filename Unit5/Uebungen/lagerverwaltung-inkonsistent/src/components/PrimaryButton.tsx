// src/components/PrimaryButton.tsx
type Props = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function PrimaryButton({ label, onClick, disabled = false }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "8px 20px",
        border: "none",
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