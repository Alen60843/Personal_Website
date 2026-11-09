import { cn } from "@/lib/utils"

/** Scrolling clock / data waveform used as a section divider. */
export function WaveDivider() {
  const unit =
    "M0 30 H20 V10 H60 V30 H80 V10 H100 V30 H140 V10 H160 V30 H200 V10 H220 V30 H240 V10 H280 V30 H300 V10 H320 V30 H360 V10 H400 V30"
  return (
    <div className="relative h-10 overflow-hidden border-y border-line bg-panel/60" aria-hidden="true">
      <svg className="wave-scroll absolute left-0 top-0 h-10" width="1600" height="40" viewBox="0 0 800 40" preserveAspectRatio="none">
        <g stroke="#38f2a8" strokeWidth="1.5" fill="none" opacity="0.7">
          <path d={unit} transform="translate(0 4)" />
          <path d={unit} transform="translate(400 4)" />
          <path d={unit} transform="translate(800 4)" />
        </g>
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-transparent to-bg" />
    </div>
  )
}

/** Section heading styled like a net label / register name. */
export function SectionTitle({ children }: { index?: string; children: string }) {
  return (
    <h2 className="mb-8 text-4xl font-semibold tracking-[-0.025em] text-ink sm:text-5xl">{children}</h2>
  )
}

/** A chip-package card: header strip with pin dots on both sides. */
export function ChipCard({
  label,
  status,
  children,
  className,
}: {
  label: string
  status?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "group relative min-w-0 rounded-2xl border border-white/10 bg-panel/90 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-colors hover:border-white/20",
        className,
      )}
    >
      <div className="absolute -left-[3px] top-8 hidden h-24 w-[6px] flex-col justify-between sm:flex" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="h-[3px] w-[6px] rounded-sm bg-line transition-colors group-hover:bg-trace" />
        ))}
      </div>
      <div className="absolute -right-[3px] top-8 hidden h-24 w-[6px] flex-col justify-between sm:flex" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="h-[3px] w-[6px] rounded-sm bg-line transition-colors group-hover:bg-trace" />
        ))}
      </div>
      <div className="mb-5 flex items-center gap-3 text-xs">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex-1 text-center font-medium text-dim">{label}</span>
        {status ? (
          <span className="flex items-center gap-1.5 rounded-full bg-amber/15 px-2.5 py-1 font-medium text-amber">
            <span className="led h-1.5 w-1.5 rounded-full bg-amber" />
            {status}
          </span>
        ) : (
          <span className="w-[42px]" aria-hidden="true" />
        )}
      </div>
      {children}
    </div>
  )
}

/** The streaming denoise pipeline, with a pixel travelling through it. */
export function DenoisePipeline() {
  const stages = ["Pixel in", "Line buffers", "Window 3×3 / 5×5", "Boundary reflect", "Local μ, σ²", "Wiener filter", "Pixel out"]
  const w = 118
  const gap = 22
  const total = stages.length * w + (stages.length - 1) * gap
  const y = 40
  const path = `M0 ${y + 24} H${total}`
  return (
    <div className="overflow-x-auto pb-2">
      <svg
        viewBox={`-4 0 ${total + 8} 100`}
        className="min-w-[760px]"
        role="img"
        aria-label="Streaming pipeline: pixel in, line buffers, sliding window, boundary reflection, local statistics, Wiener filter, pixel out"
      >
        {stages.map((s, i) => {
          const x = i * (w + gap)
          return (
            <g key={s}>
              <rect x={x} y={y} width={w} height={48} rx={5} fill="#1c1c1e" stroke="#3a3a3c" />
              <text
                x={x + w / 2}
                y={y + 29}
                textAnchor="middle"
                fontSize="11"
                fill="#e6ecf5"
                fontFamily="ui-monospace, Consolas, monospace"
              >
                {s}
              </text>
              <text x={x + 6} y={y - 8} fontSize="9" fill="#38f2a8" fontFamily="ui-monospace, Consolas, monospace">
                {`S${i}`}
              </text>
              {i < stages.length - 1 && (
                <line x1={x + w} y1={y + 24} x2={x + w + gap} y2={y + 24} stroke="#38f2a8" strokeWidth="1.5" className="trace-flow" />
              )}
            </g>
          )
        })}
        <rect x="-4" y={y + 20} width="8" height="8" rx="1" fill="#ffb454">
          <animateMotion dur="5s" repeatCount="indefinite" path={path} />
        </rect>
      </svg>
    </div>
  )
}

/** One manager and twenty employee agents, as a node grid. */
export function AgentGrid() {
  return (
    <div className="flex flex-col items-center gap-3" aria-label="One manager agent coordinating twenty employee agents">
      <div className="rounded-full bg-amber/15 px-3.5 py-1.5 text-xs font-semibold text-amber">MANAGER</div>
      <div className="h-5 w-px bg-gradient-to-b from-amber/60 to-line" />
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-bg font-mono text-[10px] text-dim"
          >
            <span className="led" style={{ animationDelay: `${(i * 137) % 1400}ms` }}>
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Small macOS-style token pill. */
export function Tag({ children }: { children: string }) {
  return <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-ink/80">{children}</span>
}
