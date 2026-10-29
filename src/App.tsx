import { useEffect, useState } from "react";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { LogicalSize, LogicalPosition } from "@tauri-apps/api/dpi";
import "./token.css";

// Later, this comes from a user config file (settings.json)
const barPosition: "top" | "bottom" | "left" | "right" = "top";
const barThickness = 40;

export default function App() {
  const [now, setNow] = useState(() => new Date());

  // Clock interval
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Window positioning logic
  useEffect(() => {
    const win = getCurrentWebviewWindow();
    
    const applyPosition = async () => {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;

      let width = screenWidth;
      let height = barThickness;
      let x = 0;
      let y = 0;

      if (barPosition === "bottom") {
        y = screenHeight - barThickness;
      } else if (barPosition === "left") {
        width = barThickness;
        height = screenHeight;
      } else if (barPosition === "right") {
        width = barThickness;
        height = screenHeight;
        x = screenWidth - barThickness;
      }

      await win.setSize(new LogicalSize(width, height));
      await win.setPosition(new LogicalPosition(x, y));
    };

    applyPosition();
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const isVertical = barPosition === "left" || barPosition === "right";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isVertical ? "var(--sp-4) 0" : "0 var(--sp-4)",
        width: "100%",
        height: "100%",
        background: "var(--bg-panel)",
        color: "var(--fg)",
        fontFamily: "system-ui, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Workspaces */}
      <div style={{ 
        display: "flex", 
        flexDirection: isVertical ? "column" : "row", 
        gap: "var(--sp-2)" 
      }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--accent)" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--bg-elev)" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--bg-elev)" }} />
      </div>

      {/* Clock */}
      <div style={{ 
        fontSize: 14, 
        fontVariantNumeric: "tabular-nums", 
        fontWeight: 500,
        writingMode: isVertical ? "vertical-rl" : "horizontal-tb"
      }}>
        {pad(now.getHours())}:{pad(now.getMinutes())}
      </div>

      {/* Status */}
      <div style={{ 
        display: "flex", 
        flexDirection: isVertical ? "column" : "row", 
        gap: "var(--sp-3)", 
        fontSize: 12, 
        color: "var(--fg-muted)" 
      }}>
        <span>CPU</span>
        <span>VOL</span>
        <span>BAT</span>
      </div>
    </div>
  );
}