import { useState } from "react";
import { User } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { CURRENCIES } from "../data/mockData";

export default function SettingsView({ c, currency, setCurrency, dark, setDark }) {
  const [notifications, setNotifications] = useState(true);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <GlassCard c={c} className="p-5">
        <div className="text-sm font-semibold mb-4">Profile</div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.success})`, color: "#fff" }}>
            <User size={22} />
          </div>
          <div>
            <div className="font-semibold text-sm">Belinda Ajiambo</div>
            <div className="text-xs" style={{ color: c.textMuted }}>ajiambo@email.com</div>
          </div>
        </div>
        <button className="text-sm font-semibold px-4 py-2 rounded-xl" style={{ background: c.track, color: c.text }}>Edit profile</button>
      </GlassCard>

      <GlassCard c={c} className="p-5">
        <div className="text-sm font-semibold mb-4">Preferences</div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm" style={{ color: c.textMuted }}>Currency</span>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="text-sm px-3 py-1.5 rounded-xl outline-none" style={{ background: c.track, color: c.text }}>
            {Object.keys(CURRENCIES).map((code) => <option key={code} value={code}>{code}</option>)}
          </select>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm" style={{ color: c.textMuted }}>Theme</span>
          <div className="flex rounded-xl overflow-hidden" style={{ border: `1px solid ${c.border}` }}>
            <button onClick={() => setDark(false)} className="px-3 py-1.5 text-xs font-semibold" style={{ background: !dark ? c.primary : "transparent", color: !dark ? "#fff" : c.textMuted }}>Light</button>
            <button onClick={() => setDark(true)} className="px-3 py-1.5 text-xs font-semibold" style={{ background: dark ? c.primary : "transparent", color: dark ? "#fff" : c.textMuted }}>Dark</button>
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm" style={{ color: c.textMuted }}>Notifications</span>
          <button
            onClick={() => setNotifications((n) => !n)}
            className="w-10 h-6 rounded-full flex items-center px-0.5 transition-colors"
            style={{ background: notifications ? c.primary : c.track, justifyContent: notifications ? "flex-end" : "flex-start" }}
          >
            <span className="w-5 h-5 rounded-full bg-white block" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
}