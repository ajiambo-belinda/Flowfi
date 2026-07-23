export default function ProgressBar({ pct, c, danger }) {
  const over = pct >= 100;
  const warn = pct >= 80 && pct < 100;
  const color = over || danger ? c.danger : warn ? c.warning : c.success;
  return (
    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: c.track }}>
      <div
        className="h-full rounded-full"
        style={{ width: `${Math.min(100, pct)}%`, background: color, transition: "width 0.5s ease" }}
      />
    </div>
  );
}