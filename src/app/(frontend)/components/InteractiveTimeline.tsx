'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'

// --- TYPESCRIPT INTERFACES ---
interface TimelineData {
  id: number
  title: string
  description: string
  image: string
}

interface TimelineItemProps {
  item: TimelineData
  index: number
}

// --- DUMMY DATA ---
const timelineData: TimelineData[] = [
  {
    id: 1,
    title: 'Jan 2022',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    image:
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Feb 2022',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    image:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Mar 2022',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    image:
      'https://images.unsplash.com/photo-1620189507195-68309c04c4d0?q=80&w=800&auto=format&fit=crop',
  },
]

// --- MAIN COMPONENT ---
export default function InteractiveTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // Smooths out the line filling animation
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div
      className="relative bg-white text-slate-900 py-32 min-h-screen overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Background line (2px wide) — Center is 38px on mobile, centered on desktop */}
        <div className="absolute left-[37px] top-0 bottom-0 w-[2px] bg-gray-200 md:left-1/2 md:-translate-x-1/2" />

        {/* Animated filled line (4px wide) — Center is 38px on mobile, centered on desktop */}
        <motion.div
          className="absolute left-[36px] top-0 bottom-0 w-[4px] bg-primary origin-top md:left-1/2 md:-translate-x-1/2"
          style={{ scaleY }}
        />

        {/* Timeline Items List */}
        <div className="space-y-24 md:space-y-40">
          {timelineData.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

// --- INDIVIDUAL ITEM COMPONENT ---
function TimelineItem({ item, index }: TimelineItemProps) {
  const isEven = index % 2 === 0

  return (
    <div>
      {/* ── MOBILE LAYOUT ── */}
      <div className="flex items-start md:hidden">
        {/* Dot — width 44px + 16px container padding = center at exactly 38px */}
        <div className="flex-shrink-0 w-11 flex justify-center pt-[6px] relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true, amount: 'some' }} // Triggers immediately on entering screen
            className="w-5 h-5 rounded-full bg-primary border-4 border-white shadow-[0_0_0_2px_rgba(0,0,0,0.1)]"
          />
        </div>

        {/* Stacked Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 'some' }} // Triggers immediately on entering screen
          className="flex flex-col gap-3 pl-4 text-left w-full pr-4"
        >
          <h3 className="text-3xl font-bold text-primary">{item.title}</h3>
          <p className="text-base text-gray-600 leading-relaxed">{item.description}</p>
          <div className="relative rounded-lg overflow-hidden shadow-xl bg-gray-100 mt-2 w-full">
            <img
              src={item.image}
              alt={item.title}
              className="w-full object-cover h-[250px] hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div
        className={`hidden md:flex items-center justify-between w-full group ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
      >
        {/* TEXT CONTENT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-50px' }}
          className={`w-[45%] flex flex-col ${isEven ? 'items-end text-right pr-8' : 'items-start text-left pl-8'}`}
        >
          <h3 className="text-4xl font-bold mb-3 text-primary">{item.title}</h3>
          <p className="text-lg text-gray-600 leading-relaxed max-w-sm">{item.description}</p>
        </motion.div>

        {/* CENTER: Animated Dot */}
        <div className="w-[10%] flex justify-center relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true, margin: '-50px' }}
            className="w-5 h-5 rounded-full bg-primary border-4 border-white shadow-[0_0_0_2px_rgba(0,0,0,0.1)]"
          />
        </div>

        {/* IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-50px' }}
          className={`w-[45%] ${isEven ? 'pl-8' : 'pr-8'}`}
        >
          <div className="relative rounded-lg overflow-hidden shadow-2xl bg-gray-100">
            <img
              src={item.image}
              alt={item.title}
              className="w-full object-cover h-[350px] hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
