'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'

// --- TYPESCRIPT INTERFACES ---

export interface TimelineEntry {
  id?: string | null
  dateLabel: string
  description: string
  imageUrl: string
  imageAlt: string
}

interface TimelineEntryProps {
  item: TimelineEntry
  index: number
}

// --- MAIN COMPONENT ---
// The trail: a dashed route that fills in as the visitor walks the story.
export default function InteractiveTimeline({ entries }: { entries: TimelineEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  if (!entries.length) return null

  return (
    <section className="section overflow-hidden" ref={containerRef}>
      <div className="wrap">
        <div className="relative">
          <div className="absolute left-[5px] top-0 bottom-0 border-l border-dashed border-ink/25 md:left-1/2" />

          <motion.div
            className="absolute left-[5px] top-0 bottom-0 w-px bg-primary origin-top md:left-1/2"
            style={{ scaleY }}
          />

          <ol className="flex flex-col gap-20 md:gap-32">
            {entries.map((item, index) => (
              <TimelineItem key={item.id ?? index} item={item} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

// --- INDIVIDUAL ITEM COMPONENT ---
function TimelineItem({ item, index }: TimelineEntryProps) {
  const isEven = index % 2 === 0
  const reduceMotion = useReducedMotion()

  const rise = {
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    viewport: { once: true, margin: '0px 0px -10% 0px' },
  }

  return (
    <li className="relative grid gap-6 pl-9 md:grid-cols-2 md:items-center md:gap-0 md:pl-0">
      <span
        className="trail-dot absolute left-0 top-2 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
        aria-hidden="true"
      />

      <motion.div
        {...rise}
        className={`flex flex-col gap-3 ${
          isEven ? 'md:items-end md:pr-16 md:text-right' : 'md:order-2 md:pl-16'
        }`}
      >
        <p className="meta">Stop {String(index + 1).padStart(2, '0')}</p>
        <h3 className="display-m">{item.dateLabel}</h3>
        <p className="max-w-sm text-base text-ink-75">{item.description}</p>
      </motion.div>

      <motion.div {...rise} className={isEven ? 'md:pl-16' : 'md:order-1 md:pr-16'}>
        <div className="aspect-[4/3] overflow-hidden rounded-m bg-paper-3">
          <img src={item.imageUrl} alt={item.imageAlt} className="size-full object-cover" />
        </div>
      </motion.div>
    </li>
  )
}
