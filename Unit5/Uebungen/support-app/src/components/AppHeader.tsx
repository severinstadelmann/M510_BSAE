// src/components/AppHeader.tsx
type Props = {
  title: string;
  username?: string;
  onLogout?: () => void;
};

export default function AppHeader({ title, username, onLogout }: Props) {
  return (
    <header
      style={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontWeight: 700, fontSize: "18px" }}>{title}</span>
      {username && (
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "14px" }}>
          <span>{username}</span>
          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                background: "transparent",
                border: "1px solid white",
                color: "white",
                padding: "4px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Abmelden
            </button>
          )}
        </div>
      )}
    </header>
  );
}