import { Wallet, TrendingUp, TrendingDown, PiggyBank, Target } from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from "recharts";
import GlassCard from "../components/GlassCard";
import StatCard from "../components/StatCard";
import CircularProgress from "../components/CircularProgress";
import InsightsPanel from "./InsightsPanel";
import { CATEGORY_COLORS, TREND_DATA } from "../data/mockData";

export default function DashboardView({ c, money, totalIncome, totalExpenses, balance, savings, budgetRemaining, categorySpend, highestCategory, spendDelta, overBudgetCategories }) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        <StatCard c={c} icon={Wallet} label="Total Balance" value={money(balance)} delta={6.2} accent={c.primary} gradient={c.primary} />
        <StatCard c={c} icon={TrendingUp} label="Monthly Income" value={money(totalIncome)} delta={12.4} accent={c.success} gradient={c.success} />
        <StatCard c={c} icon={TrendingDown} label="Monthly Expenses" value={money(totalExpenses)} delta={Number(spendDelta)} accent={c.danger} gradient={c.danger} />
        <StatCard c={c} icon={PiggyBank} label="Savings" value={money(savings)} delta={4.1} accent={c.warning} gradient={c.warning} />
        <StatCard c={c} icon={Target} label="Budget Remaining" value={money(budgetRemaining)} accent={c.primary} gradient={c.success} className="col-span-2 md:col-span-1" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <GlassCard c={c} className="p-5 xl:col-span-1">
          <div className="text-sm font-semibold mb-4">Expense by Category</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categorySpend} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {categorySpend.map((d) => <Cell key={d.name} fill={CATEGORY_COLORS[d.name]} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, color: c.text }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 justify-center">
            {categorySpend.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs" style={{ color: c.textMuted }}>
                <span className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLORS[d.name] }} />
                {d.name}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard c={c} className="p-5 xl:col-span-1">
          <div className="text-sm font-semibold mb-4">Income vs Expenses</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke={c.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: c.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: c.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, color: c.text }} />
              <Bar dataKey="income" fill={c.success} radius={[6, 6, 0, 0]} />
              <Bar dataKey="expenses" fill={c.danger} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard c={c} className="p-5 xl:col-span-1 flex flex-col items-center justify-center">
          <div className="text-sm font-semibold mb-4 self-start">Savings Progress</div>
          <CircularProgress c={c} percent={(savings / (totalIncome || 1)) * 100} size={140} stroke={12}
            color={c.success} track={c.track} label="of income saved" sublabel={money(savings)} />
        </GlassCard>
      </div>

      <GlassCard c={c} className="p-5">
        <div className="text-sm font-semibold mb-4">Monthly Spending Trend</div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={TREND_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke={c.border} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: c.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: c.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
            <Tooltip contentStyle={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, color: c.text }} />
            <Line type="monotone" dataKey="expenses" stroke={c.primary} strokeWidth={3} dot={{ r: 4, fill: c.primary }} />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>

      <InsightsPanel c={c} money={money} highestCategory={highestCategory} spendDelta={spendDelta} overBudgetCategories={overBudgetCategories} savings={savings} totalIncome={totalIncome} />
    </>
  );
}