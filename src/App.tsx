import { useEffect, useState } from "react"
import { Stethoscope, GraduationCap } from "lucide-react"
import MetroHero from "@/components/ui/scroll-locked-video-hero"
import Reveal from "@/components/Reveal"
import Projects from "@/components/Projects"
import { SectionTitle, Tag, WaveDivider } from "@/components/Hardware"
import { cn } from "@/lib/utils"

const GITHUB = "https://github.com/Alen60843"

const NAV = [
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
]

const SKILLS: { group: string; items: string[] }[] = [
  { group: "RTL / VLSI", items: ["SystemVerilog", "RTL design", "FPGA", "Pipelining & FSMs", "Fixed-point arithmetic", "Computer architecture"] },
  { group: "Verification", items: ["Testbenches", "UVM concepts", "Icarus Verilog", "GTKWave", "Waveform analysis"] },
  { group: "Software", items: ["Python", "C / C++", "Git & GitHub", "Scripting & automation", "Playwright"] },
  { group: "AI & agents", items: ["Copilot / Codex / Claude Code", "MCP tools", "Multi-agent workflows", "Dev Containers & Docker"] },
  { group: "Signals", items: ["DSP", "Image processing", "Wiener filtering", "Noise & SNR evaluation"] },
]

function Nav() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#1c1c1e]/70 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300",
        show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
      )}
    >
      <nav className="mx-auto flex h-11 max-w-5xl items-center justify-between px-5 text-[13px]">
        <a href="#top" className="font-semibold text-ink">
          Alen Faer
        </a>
        <ul className="flex gap-1 text-dim">
          {NAV.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className="rounded-md px-2.5 py-1 capitalize transition-colors hover:bg-white/10 hover:text-ink">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default function App() {
  return (
    <div id="top">
      <Nav />

      <MetroHero
        title="ALEN FAER"
        tagline="From silicon to systems."
        scrollHint="SCROLL"
        signature={false}
        scrubDistance={2600}
      />

      <WaveDivider />

      <main className="pcb-grid">
        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-5xl px-5 py-24">
          <Reveal>
            <SectionTitle index="01">About</SectionTitle>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-5">
            <Reveal className="md:col-span-3">
              <p className="text-lg leading-relaxed text-ink">
                I'm an Electrical and Computer Engineering student at the <strong className="text-trace">Technion</strong>, finishing my
                B.Sc. around March 2027. My work sits where hardware meets software: RTL design, verification, and the tooling
                that makes engineers faster.
              </p>
              <p className="mt-4 leading-relaxed text-dim">
                I'm most motivated by understanding how a system works, building it, and seeing a measurable result. Math is a
                tool for me, not the goal. Beyond digital design I'm drawn to AI agents, medical technology, and building products
                that solve real problems. I spent 14 months travelling through South America, which is where my startup thinking
                started.
              </p>
            </Reveal>

            <Reveal className="md:col-span-2" delay={120}>
              <div className="rounded-2xl border border-white/10 bg-panel/90 p-5 font-mono text-[13px] shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                <div className="mb-4 flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <p className="text-dim">$ cat alen.cfg</p>
                <p><span className="text-amber">degree</span> = "B.Sc. ECE, Technion"</p>
                <p><span className="text-amber">grad</span> = "~March 2027"</p>
                <p><span className="text-amber">before</span> = "CS, Open University"</p>
                <p><span className="text-amber">focus</span> = ["RTL", "AI agents", "MedTech"]</p>
                <p><span className="text-amber">langs</span> = ["EN", "HE"]</p>
                <p className="mt-2 text-dim">
                  $ <span className="caret">▌</span>
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <Projects />

        {/* SKILLS */}
        <section id="skills" className="mx-auto max-w-5xl px-5 pb-24">
          <Reveal>
            <SectionTitle index="03">Skills</SectionTitle>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-panel/90 text-sm">
              {SKILLS.map((s, i) => (
                <div
                  key={s.group}
                  className={cn("grid items-center gap-2 px-5 py-4 sm:grid-cols-[9rem_1fr]", i > 0 && "border-t border-white/10")}
                >
                  <span className="font-medium text-dim">{s.group}</span>
                  <span className="flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <Tag key={it}>{it}</Tag>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-panel/90 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-trace" />
                  <h3 className="font-semibold">Exploring: medicine and AI</h3>
                </div>
                <p className="text-sm text-dim">
                  Medical devices, neural interfaces, and AI for clinical workflows. These are areas I'm studying and thinking
                  about, not things I've built yet.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-2xl border border-white/10 bg-panel/90 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-trace" />
                  <h3 className="font-semibold">Education</h3>
                </div>
                <p className="text-sm text-dim">
                  B.Sc. Electrical and Computer Engineering, Technion (expected March 2027). Earlier: Computer Science at the
                  Open University of Israel, 2022–2023.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-5xl px-5 pb-24">
          <Reveal>
            <SectionTitle index="04">Contact</SectionTitle>
          </Reveal>
          <Reveal>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset] transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
            >
              <svg className="h-5 w-5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View on GitHub
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-panel/60 py-6 text-center text-xs text-dim">
        <span className="led mr-2 inline-block h-1.5 w-1.5 rounded-full bg-trace" />
        Alen Faer
      </footer>
    </div>
  )
}
