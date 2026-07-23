import { ArrowUp, ArrowDown } from "lucide-react";
import GlassCard from "./GlassCard";

export default function StatCard({ c, icon: Icon, label, value, delta, accent, gradient, className = "" }) {
  const up = delta >= 0;
  return (
    <GlassCard c={c} className={`p-4 sm:p-5 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${className}`}>
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20"
        style={{ background: `radial-gradient(circle, ${gradient} 0%, transparent 70%)` }}
      />
      <div className="flex items-center justify-between relative">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: `${accent}22`, color: accent }}
        >
          <Icon size={20} />
        </div>
        {delta !== undefined && (
          <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: up ? c.success : c.danger }}>
            {up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            {Math.abs(delta)}%
          </div>
        )}
      </div>
      <div className="mt-4 relative">
        <div className="text-xs font-medium truncate" style={{ color: c.textMuted }}>{label}</div>
        <div className="text-lg sm:text-2xl font-bold mt-1 truncate" style={{ color: c.text }}>{value}</div>
      </div>
    </GlassCard>
  );
}