import katex from "katex"
import "katex/dist/katex.min.css"
import { cn } from "@/lib/utils"

/** Renders a LaTeX string with KaTeX. Only pass trusted, hard-coded strings. */
export default function Tex({
  tex,
  display = false,
  className,
}: {
  tex: string
  display?: boolean
  className?: string
}) {
  const html = katex.renderToString(tex, { displayMode: display, throwOnError: false })
  return <span className={cn(className)} dangerouslySetInnerHTML={{ __html: html }} />
}
