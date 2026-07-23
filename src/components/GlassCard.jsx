export default function GlassCard({ c, children, style, className = "" }) {
  return (
    <div
      className={`rounded-3xl ${className}`}
      style={{
        background: c.surfaceAlt,
        backdropFilter: "blur(20px)",
        border: `1px solid ${c.border}`,
        boxShadow: "0 8px 30px -12px rgba(0,0,0,0.25)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}