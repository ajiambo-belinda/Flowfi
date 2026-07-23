import { Wallet, X } from "lucide-react";
import { NAV_ITEMS } from "../theme";

export default function Sidebar({ c, view, setView, sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <aside
        className={`fixed lg:static z-30 h-full w-64 p-5 flex flex-col justify-between transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ background: c.surface, borderRight: `1px solid ${c.border}` }}
      >
        <div>
          <div className="px-2 mb-8">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.success})` }}>
        <Wallet size={18} color="#fff" />
      </div>
      <span className="text-lg font-bold tracking-tight">FlowFi</span>
    </div>
    <button className="lg:hidden" onClick={() => setSidebarOpen(false)} style={{ color: c.textMuted }} aria-label="Close menu">
      <X size={18} />
    </button>
  </div>
  <p className="text-xs mt-1.5 ml-0.5" style={{ color: c.textMuted }}>Track it. Budget it. Own it.</p>
</div>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = view === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => { setView(item.key); setSidebarOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-colors duration-200"
                  style={{
                    background: active ? `${c.primary}1A` : "transparent",
                    color: active ? c.primary : c.textMuted,
                  }}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="px-3 py-3 rounded-2xl text-xs" style={{ background: c.surfaceAlt, color: c.textMuted, border: `1px solid ${c.border}` }}>
          Signed in as <span style={{ color: c.text, fontWeight: 600 }}>Belinda.</span>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </>
  );
}