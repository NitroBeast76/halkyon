import { useEffect, useState } from "react";
import "./token.css";

export default function App() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--sp-3)",
        padding: "var(--sp-3) var(--sp-4)",
        background: "var(--bg-panel)",
        borderRadius: "var(--r-panel)",
        color: "var(--fg)",
        fontFamily: "system-ui, sans-serif",
        margin: "var(--sp-4)",
        width: "fit-content",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "var(--r-inner)",
          background: "var(--accent)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 11,
            color: "var(--fg-muted)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          halkyon probe
        </span>
        <span style={{ fontSize: 20, fontVariantNumeric: "tabular-nums" }}>
          {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
        </span>
      </div>
    </div>
  );
}