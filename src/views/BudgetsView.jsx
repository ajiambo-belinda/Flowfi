import GlassCard from "../components/GlassCard";
import ProgressBar from "../components/ProgressBar";
import { BUDGETS, CATEGORY_COLORS } from "../data/mockData";

export default function BudgetsView({ c, money, transactions }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {BUDGETS.map((b) => {
        const spent = transactions.filter((t) => t.category === b.category).reduce((s, t) => s + t.amount, 0);
        const remaining = b.budget - spent;
        const pct = (spent / b.budget) * 100;
        return (
          <GlassCard key={b.category} c={c} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: CATEGORY_COLORS[b.category] }} />
                <span className="font-semibold text-sm">{b.category}</span>
              </div>
              <span className="text-xs font-semibold" style={{ color: pct >= 100 ? c.danger : c.textMuted }}>{Math.round(pct)}%</span>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-lg font-bold">{money(spent)}</span>
              <span className="text-xs" style={{ color: c.textMuted }}>of {money(b.budget)}</span>
            </div>
            <ProgressBar pct={pct} c={c} />
            <div className="mt-3 text-xs" style={{ color: remaining < 0 ? c.danger : c.textMuted }}>
              {remaining < 0 ? `Over by ${money(Math.abs(remaining))}` : `${money(remaining)} remaining`}
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}