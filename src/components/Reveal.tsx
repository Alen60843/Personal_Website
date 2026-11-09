import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Fades children in the first time they scroll into view. */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in")
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn("reveal min-w-0", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
