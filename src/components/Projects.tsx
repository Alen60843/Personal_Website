import { useEffect, useState, type ReactNode } from "react"
import { Cpu, Plane, ArrowLeft } from "lucide-react"
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero"
import { ChipCard, DenoisePipeline, Tag } from "@/components/Hardware"
import denoiseImg from "@/assets/projects/denoise.svg"
import fpgaImg from "@/assets/projects/fpga-game.svg"
import intelImg from "@/assets/projects/intel-tooling.svg"
import travelImg from "@/assets/projects/travelwith.svg"
import Tex from "@/components/Tex"
import { cn } from "@/lib/utils"

type Project = {
  id: string
  name: string
  image: string
  label: string
  status?: string
  body: () => ReactNode
}

// Images are imported through Vite so their URLs are always correct, wherever the site is hosted.
const PROJECTS: Project[] = [
  {
    id: "denoise",
    name: "Image Denoising Accelerator",
    image: denoiseImg,
    label: "U1 · VLSI_DENOISE",
    status: "RTL + simulation stage",
    body: () => (
      <>
        <div className="mb-1 flex items-center gap-2">
          <Cpu className="h-5 w-5 text-trace" />
          <h3 className="text-xl font-semibold">Image Denoising Accelerator</h3>
        </div>
        <p className="mb-5 text-dim">
          A hardware accelerator that removes Gaussian noise using a local Wiener filter, built in SystemVerilog for the
          Technion VLSI lab together with Tomer Beck. The design is a streaming pipeline that supports 3×3 and 5×5 windows
          with reflective edge handling, aiming for about one output pixel per clock once the pipeline is full.
        </p>
        <DenoisePipeline />
        <div className="mt-4 overflow-x-auto rounded-lg bg-white/5 px-4 py-3 text-center text-ink">
          <Tex
            display
            tex={String.raw`\hat{x}=\mu+\frac{\max(\sigma^{2}-\nu^{2},\,0)}{\max(\sigma^{2},\,\epsilon)}\,(y-\mu)`}
          />
          <p className="mt-1 text-xs text-dim">
            <Tex tex="y" /> noisy pixel, <Tex tex="\mu" /> local mean, <Tex tex="\sigma^{2}" /> local variance,{" "}
            <Tex tex="\nu^{2}" /> noise variance, <Tex tex="\epsilon" /> small constant
          </p>
        </div>
        <p className="mt-4 text-sm text-dim">
          Verified in simulation with Icarus Verilog and Python tooling that converts 512×512 images to HEX, reconstructs the
          output, and checks SNR. Back-end implementation is a later stage and has not been done.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["SystemVerilog", "Icarus Verilog", "Python", "Fixed-point", "Line buffers"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "fpga-game",
    name: "FPGA Game",
    image: fpgaImg,
    label: "U2 · FPGA_GAME",
    body: () => (
      <>
        <h3 className="mb-1 text-xl font-semibold">Angry Birds on an FPGA</h3>
        <p className="mb-5 text-dim">
          A hardware implementation of an Angry Birds-style game, written in SystemVerilog and targeting a Cyclone V FPGA. It
          combines digital design with game logic: the bird follows a trajectory computed from physics-based equations, collides
          with obstacles and targets, and the game keeps score, lives, and levels. The picture goes out over VGA to a monitor.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            ["Game logic", "Bird trajectory, collision detection, scoring, lives, and level progression."],
            ["VGA controller", "Generates the video signals and draws the bird, obstacles, targets, and backgrounds from bitmap and MIF image data."],
            ["Input", "Keyboard (keypad decoder) or switches to launch the bird and reset the game, plus a random-number block."],
            ["Audio and display", "Sine-table tone generator for sound, and a 7-segment display controller."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl bg-white/5 p-4">
              <p className="mb-1 text-sm font-semibold text-ink">{title}</p>
              <p className="text-sm text-dim">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {["SystemVerilog", "Intel Quartus 17.0 Lite", "Cyclone V 5CSXFC6D6F31C6", "ModelSim / Qsim testbenches", "VGA"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <a
          href="https://github.com/Alen60843/Angry-Bird-Game"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-[filter] hover:brightness-110"
        >
          View the repository
        </a>
      </>
    ),
  },
  {
    id: "intel",
    name: "Engineering Automation",
    image: intelImg,
    label: "U3 · INTEL_TOOLING",
    body: () => (
      <>
        <h3 className="mb-1 text-xl font-semibold">Engineering automation at Intel</h3>
        <p className="text-dim">
          Work on hardware-design workflows: Copilot CLI integration, custom MCP tools, simulation setup support, PDK and
          library queries, and Playwright-based verification.
        </p>
      </>
    ),
  },
  {
    id: "travelwith",
    name: "Travel Startup",
    image: travelImg,
    label: "U4 · TRAVELWITH",
    status: "validation",
    body: () => (
      <>
        <div className="mb-1 flex items-center gap-2">
          <Plane className="h-5 w-5 text-trace" />
          <h3 className="text-xl font-semibold">Travel startup concept</h3>
        </div>
        <p className="text-dim">
          An idea to connect travellers with each other and with local activity suppliers, based on my time backpacking.
          Still being tested with real travellers and suppliers before anything is built.
        </p>
      </>
    ),
  },
]

const IMAGES = PROJECTS.map((p) => ({ src: p.image, alt: p.name }))

function fromHash() {
  const id = window.location.hash.replace("#project-", "")
  return PROJECTS.some((p) => p.id === id) ? id : null
}

export default function Projects() {
  const [selected, setSelected] = useState<string | null>(null)

  // Open a project directly from a link like /#project-denoise.
  useEffect(() => {
    const id = fromHash()
    if (id) setSelected(id)
  }, [])

  const open = (id: string) => {
    setSelected(id)
    window.history.replaceState(null, "", `#project-${id}`)
    requestAnimationFrame(() =>
      document.getElementById("project-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    )
  }

  const back = () => {
    setSelected(null)
    window.history.replaceState(null, "", "#projects")
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const project = PROJECTS.find((p) => p.id === selected)

  return (
    <section id="projects" className="scroll-mt-11 pb-24">
      <TiltedGridHero images={IMAGES} speed={4} tileHeight={30} axis={50} curve={78} className="h-[600px] w-full">
        <div className="relative z-10 flex h-full flex-col items-center justify-between px-5 py-14 text-center">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.025em] text-ink sm:text-5xl">Projects</h2>
            <p className="mt-3 text-base text-dim">Select a project to read how it works.</p>
          </div>
          <div className="flex max-w-3xl flex-wrap justify-center gap-2">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => open(p.id)}
                aria-pressed={selected === p.id}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium backdrop-blur-xl transition-[background-color,transform] active:scale-[0.97]",
                  selected === p.id
                    ? "bg-accent text-white"
                    : "bg-white/10 text-ink hover:bg-white/20",
                )}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </TiltedGridHero>

      <div id="project-detail" className="mx-auto mt-10 max-w-5xl scroll-mt-16 px-5">
        {project ? (
          <div key={project.id} className="fade-up">
            <button
              type="button"
              onClick={back}
              className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              All projects
            </button>
            <ChipCard label={project.label} status={project.status}>
              {project.body()}
            </ChipCard>
          </div>
        ) : null}
      </div>
    </section>
  )
}
