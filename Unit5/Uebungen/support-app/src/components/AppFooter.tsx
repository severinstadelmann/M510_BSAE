// src/components/AppFooter.tsx
export default function AppFooter() {
  return (
    <footer
      style={{
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #e0e0e0",
        padding: "12px 24px",
        textAlign: "center",
        fontSize: "12px",
        color: "#999",
      }}
    >
      © {new Date().getFullYear()} Support-App – Intern
    </footer>
  );
}