import Image from 'next/image'
import { parrisienne } from '@/app/(frontend)/fonts'
import React from 'react'
import InteractiveTimeline from '@/app/(frontend)/components/InteractiveTimeline'

export default function AboutPage() {
  return (
    <main>
      {/* --- HERO SECTION --- */}
      <div className="relative min-h-screen md:h-[80vh] lg:h-screen w-full overflow-hidden text-foreground px-6 py-20 md:px-12 lg:px-24 pt-32 flex justify-center">
        {/* The Background Image */}
        <Image
          src="/placeholder.png"
          alt="Hero background"
          fill
          unoptimized
          priority
          className="object-cover -z-10"
          sizes="100vw"
        />

        {/* The Content Overlay */}
        <div className="relative z-10 flex h-full w-full max-w-7xl">
          <div className="flex h-auto flex-col items-start text-left">
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold flex flex-col text-black leading-[0.8]">
                KNOW OUR
                <span 
                  className={`
                    ${parrisienne.className} 
                    text-primary 
                    text-6xl md:text-7xl lg:text-8xl 
                    leading-none 
                    -mt-2 md:-mt-4 lg:-mt-6 ml-2
                  `}
                >
                  journey
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <InteractiveTimeline />
    </main>
  )
}
