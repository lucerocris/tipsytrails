import Image from 'next/image'
import { parrisienne } from '@/app/(frontend)/fonts'
import React from 'react'
import InteractiveTimeline from '@/app/(frontend)/components/InteractiveTimeline'

export default function AboutPage() {
  return (
    <main>
      {/* --- HERO SECTION --- */}
      <div className="relative h-screen w-full overflow-hidden text-foreground px-24 py-16 pt-30 flex justify-center">
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
          <div className="flex h-auto flex-col gap-1 lg:gap-3">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3.5">
                <h1 className={`text-6xl font-semibold flex flex-col gap-2 text-black`}>
                  MEET OUR
                  <span className={`${parrisienne.className} text-primary text-8xl leading-14`}>
                    journey
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InteractiveTimeline />
    </main>
  )
}
