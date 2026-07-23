import { useState } from "react";
import { Plus, X } from "lucide-react";
import GlassCard from "../components/GlassCard";
import CircularProgress from "../components/CircularProgress";

export default function GoalsView({ c, money, goals, setGoals }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");

  const addGoal = () => {
    if (!name || !target) return;
    setGoals((g) => [...g, { id: Date.now(), name, target: Number(target), saved: 0, color: c.primary }]);
    setName(""); setTarget(""); setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {goals.map((g) => (
          <GlassCard key={g.id} c={c} className="p-6 flex flex-col items-center justify-center min-h-[220px]">
            <CircularProgress c={c} percent={(g.saved / g.target) * 100} size={120} stroke={11}
              color={g.color} track={c.track} label={g.name} sublabel={`${money(g.saved)} / ${money(g.target)}`} />
          </GlassCard>
        ))}
        <button
          onClick={() => setShowForm(true)}
          className="rounded-3xl flex flex-col items-center justify-center gap-2 p-6 min-h-[220px] transition-colors"
          style={{ border: `2px dashed ${c.border}`, color: c.textMuted }}
        >
          <Plus size={20} />
          <span className="text-sm font-medium">New savings goal</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowForm(false)}>
          <GlassCard c={c} className="p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto" style={{ background: c.surface }}>
            <div onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold">New savings goal</div>
                <button onClick={() => setShowForm(false)} style={{ color: c.textMuted }}><X size={16} /></button>
              </div>
              <div className="space-y-3">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Goal name" className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={{ background: c.track, color: c.text }} />
                <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Target amount" className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={{ background: c.track, color: c.text }} />
                <button onClick={addGoal} className="w-full text-sm font-semibold py-2.5 rounded-xl" style={{ background: c.primary, color: "#fff" }}>Create goal</button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}