export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="shrink-0">
      <rect width="64" height="64" rx="18" fill="url(#dailyfitPulseGrad)" />
      <polyline
        points="12,35 21,35 26,22 33,44 39,28 45,35 53,24"
        fill="none"
        stroke="#09090b"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="dailyfitPulseGrad" x1="0" y1="64" x2="64" y2="0">
          <stop stopColor="#059669" />
          <stop offset="1" stopColor="#4ade80" />
        </linearGradient>
      </defs>
    </svg>
  );
}
