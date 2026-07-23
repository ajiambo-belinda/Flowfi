import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, PiggyBank } from "lucide-react";
import GlassCard from "../components/GlassCard";

export default function InsightsPanel({ c, money, highestCategory, spendDelta, overBudgetCategories, savings, totalIncome }) {
  const savingsRate = ((savings / (totalIncome || 1)) * 100).toFixed(0);
  const items = [
    {
      icon: Sparkles, color: c.primary,
      text: highestCategory ? `${highestCategory.name} is your highest spending category at ${money(highestCategory.value)} this month.` : "No spending recorded yet this month.",
    },
    {
      icon: spendDelta >= 0 ? TrendingUp : TrendingDown, color: spendDelta >= 0 ? c.danger : c.success,
      text: `Spending is ${Math.abs(spendDelta)}% ${spendDelta >= 0 ? "higher" : "lower"} than last month.`,
    },
    {
      icon: AlertTriangle, color: c.warning,
      text: overBudgetCategories.length
        ? `${overBudgetCategories.map((b) => b.category).join(", ")} ${overBudgetCategories.length > 1 ? "are" : "is"} close to or over budget.`
        : "All categories are comfortably within budget this month.",
    },
    {
      icon: PiggyBank, color: c.success,
      text: savingsRate >= 20 ? `Great pace — you're saving ${savingsRate}% of income. Keep it up.` : `You're saving ${savingsRate}% of income. Aim for 20% by trimming discretionary spend.`,
    },
  ];
  return (
    <GlassCard c={c} className="p-5">
      <div className="text-sm font-semibold mb-4 flex items-center gap-2">
        <Sparkles size={16} color={c.primary} /> Smart Insights
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <div key={i} className="flex items-start gap-3 p-3 rounded-2xl" style={{ background: c.track }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${it.color}22`, color: it.color }}>
                <Icon size={15} />
              </div>
              <div className="text-sm" style={{ color: c.text }}>{it.text}</div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}