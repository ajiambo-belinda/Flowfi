import { useState } from "react";
import { X } from "lucide-react";
import GlassCard from "./GlassCard";
import { CATEGORIES } from "../data/mockData";

export default function TransactionModal({ c, tx, onClose, onSave }) {
  const [form, setForm] = useState(tx);
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <GlassCard c={c} className="p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto" style={{ background: c.surface }}>
        <div onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold">{tx.description === "" ? "Add Transaction" : "Edit Transaction"}</div>
            <button onClick={onClose} style={{ color: c.textMuted }}><X size={16} /></button>
          </div>
          <div className="space-y-3">
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description"
              className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={{ background: c.track, color: c.text }} />
            <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} placeholder="Amount"
              className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={{ background: c.track, color: c.text }} />
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={{ background: c.track, color: c.text }} />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={{ background: c.track, color: c.text }}>
              {[...CATEGORIES, "Income"].map((cat) => <option key={cat}>{cat}</option>)}
            </select>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={{ background: c.track, color: c.text }}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <button onClick={() => onSave(form)} className="w-full text-sm font-semibold py-2.5 rounded-xl" style={{ background: c.primary, color: "#fff" }}>
              Save transaction
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}