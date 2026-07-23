import { Menu, Sun, Moon, Bell, User } from "lucide-react";
import { CURRENCIES } from "../data/mockData";
import { NAV_ITEMS } from "../theme";

export default function TopBar({ c, view, dark, setDark, currency, setCurrency, setSidebarOpen }) {
    const current = NAV_ITEMS.find((n) => n.key === view);
  return (
    <header className="flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 lg:px-8 py-3 sm:py-4 sticky top-0 z-10" style={{ background: `${c.bg}CC`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${c.border}` }}>
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button className="lg:hidden shrink-0" onClick={() => setSidebarOpen(true)} style={{ color: c.text }} aria-label="Open menu">
          <Menu size={22} />
        </button>
        <div className="min-w-0">
          <div className="text-base sm:text-lg font-bold capitalize truncate">{view === "goals" ? "Savings Goals" : view}</div>
          <div className="text-xs hidden sm:block" style={{ color: c.textMuted }}>{current?.subtitle}</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 shrink-0">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="text-xs font-semibold px-2 sm:px-3 py-2 rounded-xl outline-none"
          style={{ background: c.surface, color: c.text, border: `1px solid ${c.border}` }}
        >
          {Object.keys(CURRENCIES).map((code) => <option key={code} value={code}>{code}</option>)}
        </select>
        <button
          onClick={() => setDark((d) => !d)}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0"
          style={{ background: c.surface, border: `1px solid ${c.border}`, color: c.text }}
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="w-9 h-9 rounded-xl items-center justify-center relative shrink-0 hidden sm:flex" style={{ background: c.surface, border: `1px solid ${c.border}`, color: c.text }}>
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: c.danger }} />
        </button>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.success})`, color: "#fff" }}>
          <User size={16} />
        </div>
      </div>
    </header>
  );
}