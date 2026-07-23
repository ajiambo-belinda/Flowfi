import { useState, useMemo } from "react";
import { THEME } from "./theme";
import { INITIAL_TRANSACTIONS, BUDGETS, TREND_DATA, INITIAL_GOALS, CATEGORIES, CURRENCIES } from "./data/mockData";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

import DashboardView from "./views/DashboardView";
import TransactionsView from "./views/TransactionsView";
import BudgetsView from "./views/BudgetsView";
import GoalsView from "./views/GoalsView";
import ReportsView from "./views/ReportsView";
import SettingsView from "./views/SettingsView";

export default function FlowFi() {
  const [dark, setDark] = useState(true);
  const [view, setView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currency, setCurrency] = useState("KES");
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [goals, setGoals] = useState(INITIAL_GOALS);

  const c = THEME[dark ? "dark" : "light"];
  const fmt = (n) =>
    new Intl.NumberFormat(CURRENCIES[currency].locale, { maximumFractionDigits: 0 }).format(n);
  const money = (n) => `${CURRENCIES[currency].symbol} ${fmt(n)}`;

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  const savings = Math.max(0, totalIncome - totalExpenses);
  const totalBudget = BUDGETS.reduce((s, b) => s + b.budget, 0);
  const budgetRemaining = totalBudget - totalExpenses;

  const categorySpend = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      name: cat,
      value: transactions.filter((t) => t.category === cat && t.type === "expense").reduce((s, t) => s + t.amount, 0),
    })).filter((d) => d.value > 0);
  }, [transactions]);

  const highestCategory = categorySpend.reduce((max, d) => (d.value > (max?.value || 0) ? d : max), null);
  const lastMonthExpenses = TREND_DATA[TREND_DATA.length - 2].expenses;
  const spendDelta = (((totalExpenses - lastMonthExpenses) / lastMonthExpenses) * 100).toFixed(1);
  const overBudgetCategories = BUDGETS.filter((b) => {
    const spent = transactions.filter((t) => t.category === b.category).reduce((s, t) => s + t.amount, 0);
    return spent >= b.budget * 0.8;
  });

  return (
    <div className="min-h-screen w-full flex font-sans" style={{ background: c.bg, color: c.text }}>
      <Sidebar c={c} view={view} setView={setView} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar c={c} view={view} dark={dark} setDark={setDark} currency={currency} setCurrency={setCurrency} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-3 sm:p-5 lg:p-8 space-y-4 sm:space-y-6">
          {view === "dashboard" && (
            <DashboardView c={c} money={money} totalIncome={totalIncome} totalExpenses={totalExpenses}
              balance={balance} savings={savings} budgetRemaining={budgetRemaining}
              categorySpend={categorySpend} highestCategory={highestCategory} spendDelta={spendDelta}
              overBudgetCategories={overBudgetCategories} />
          )}
          {view === "transactions" && (
            <TransactionsView c={c} money={money} transactions={transactions} setTransactions={setTransactions} />
          )}
          {view === "budgets" && <BudgetsView c={c} money={money} transactions={transactions} />}
          {view === "goals" && <GoalsView c={c} money={money} goals={goals} setGoals={setGoals} />}
          {view === "reports" && (
            <ReportsView c={c} money={money} categorySpend={categorySpend} highestCategory={highestCategory} spendDelta={spendDelta} />
          )}
          {view === "settings" && <SettingsView c={c} currency={currency} setCurrency={setCurrency} dark={dark} setDark={setDark} />}
        </main>
      </div>
    </div>
  );
}