export default function CircularProgress({ percent, size = 96, stroke = 10, color, track, label, sublabel, c }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, percent));
  const offset = circ - (clamped / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
          <circle
            cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold" style={{ color: c.text }}>{Math.round(clamped)}%</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        {label && <div className="text-sm font-semibold" style={{ color: c.text }}>{label}</div>}
        {sublabel && <div className="text-xs mt-0.5" style={{ color: c.textMuted }}>{sublabel}</div>}
      </div>
    </div>
  );
}