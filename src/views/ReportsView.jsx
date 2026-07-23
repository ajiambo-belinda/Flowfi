import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import GlassCard from "../components/GlassCard";
import { CATEGORY_COLORS, TREND_DATA } from "../data/mockData";

export default function ReportsView({ c, money, categorySpend, highestCategory, spendDelta }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <GlassCard c={c} className="p-5">
        <div className="text-sm font-semibold mb-4">6-Month Income vs Expenses</div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={TREND_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke={c.border} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: c.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: c.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
            <Tooltip contentStyle={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, color: c.text }} />
            <Legend />
            <Bar dataKey="income" fill={c.success} radius={[6, 6, 0, 0]} />
            <Bar dataKey="expenses" fill={c.danger} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
      <GlassCard c={c} className="p-5">
        <div className="text-sm font-semibold mb-4">Category Breakdown</div>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={categorySpend} dataKey="value" nameKey="name" outerRadius={100} label={(d) => d.name}>
              {categorySpend.map((d) => <Cell key={d.name} fill={CATEGORY_COLORS[d.name]} />)}
            </Pie>
            <Tooltip contentStyle={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, color: c.text }} />
          </PieChart>
        </ResponsiveContainer>
      </GlassCard>
      <GlassCard c={c} className="p-5 xl:col-span-2">
        <div className="text-sm font-semibold mb-2">Summary</div>
        <p className="text-sm" style={{ color: c.textMuted }}>
          {highestCategory?.name} led spending this period at {money(highestCategory?.value || 0)}, with overall
          expenses {Math.abs(spendDelta)}% {spendDelta >= 0 ? "above" : "below"} last month's total.
        </p>
      </GlassCard>
    </div>
  );
}