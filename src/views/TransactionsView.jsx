import { useState, useMemo } from "react";
import { Search, ArrowUpDown, Pencil, Trash2, Plus } from "lucide-react";
import GlassCard from "../components/GlassCard";
import TransactionModal from "../components/TransactionModal";
import { CATEGORIES, CATEGORY_COLORS } from "../data/mockData";

export default function TransactionsView({ c, money, transactions, setTransactions }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    let rows = transactions.filter((t) =>
      t.description.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "All" || t.type === typeFilter.toLowerCase()) &&
      (catFilter === "All" || t.category === catFilter)
    );
    rows.sort((a, b) => {
      let av = a[sortField], bv = b[sortField];
      if (sortField === "amount") { av = a.amount; bv = b.amount; }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return rows;
  }, [transactions, search, typeFilter, catFilter, sortField, sortDir]);

  const toggleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("desc"); }
  };

  const remove = (id) => setTransactions((ts) => ts.filter((t) => t.id !== id));
  const save = (tx) => {
    setTransactions((ts) => (ts.some((t) => t.id === tx.id) ? ts.map((t) => (t.id === tx.id ? tx : t)) : [...ts, tx]));
    setEditing(null);
  };

  const allCategories = ["All", ...CATEGORIES, "Income"];

  return (
    <GlassCard c={c} className="p-5">
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">All Transactions</div>
          <button
            onClick={() => setEditing({ id: Date.now(), date: new Date().toISOString().slice(0, 10), description: "", category: "Food", amount: 0, type: "expense" })}
            className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-xl shrink-0"
            style={{ background: c.primary, color: "#fff" }}
          >
            <Plus size={14} /> Add
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-0" style={{ background: c.track }}>
            <Search size={14} color={c.textMuted} className="shrink-0" />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search description"
              className="bg-transparent outline-none text-sm w-full" style={{ color: c.text }}
            />
          </div>
          <div className="flex gap-2">
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="flex-1 sm:flex-none text-sm px-3 py-2 rounded-xl outline-none" style={{ background: c.track, color: c.text }}>
              {["All", "Income", "Expense"].map((o) => <option key={o}>{o}</option>)}
            </select>
            <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="flex-1 sm:flex-none text-sm px-3 py-2 rounded-xl outline-none" style={{ background: c.track, color: c.text }}>
              {allCategories.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr style={{ color: c.textMuted }}>
              {[["date", "Date"], ["description", "Description"], ["category", "Category"], ["amount", "Amount"], ["type", "Type"]].map(([field, label]) => (
                <th key={field} onClick={() => toggleSort(field)} className="text-left font-medium py-2 cursor-pointer select-none">
                  <span className="flex items-center gap-1">{label} <ArrowUpDown size={11} /></span>
                </th>
              ))}
              <th className="text-right py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} style={{ borderTop: `1px solid ${c.border}` }}>
                <td className="py-3" style={{ color: c.textMuted }}>{t.date}</td>
                <td className="py-3 font-medium">{t.description}</td>
                <td className="py-3">
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: `${CATEGORY_COLORS[t.category] || c.primary}22`, color: CATEGORY_COLORS[t.category] || c.primary }}>
                    {t.category}
                  </span>
                </td>
                <td className="py-3 font-semibold" style={{ color: t.type === "income" ? c.success : c.danger }}>
                  {t.type === "income" ? "+" : "-"}{money(t.amount)}
                </td>
                <td className="py-3 capitalize" style={{ color: c.textMuted }}>{t.type}</td>
                <td className="py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setEditing(t)} style={{ color: c.textMuted }}><Pencil size={14} /></button>
                    <button onClick={() => remove(t.id)} style={{ color: c.danger }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="text-center py-8" style={{ color: c.textMuted }}>No transactions match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && <TransactionModal c={c} tx={editing} onClose={() => setEditing(null)} onSave={save} />}
    </GlassCard>
  );
}