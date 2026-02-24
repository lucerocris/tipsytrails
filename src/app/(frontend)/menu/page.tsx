import Image from 'next/image'
import { parrisienne, playfair } from '@/app/(frontend)/fonts'
import Link from 'next/link'
import React from 'react'
import { ChevronRight } from 'lucide-react'

export default function MenuPage() {
  return (
    <>
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
                    menu
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="flex gap-10 max-w-7xl mx-auto">
          <div className="w-66">
            <div className="flex flex-col w-full gap-2">
              <p className="text-sm text-[#5E6366]">FILTERS</p>

              <div className="flex flex-col w-full">
                <div className="self-center inline-flex items-center justify-between w-full px-1 py-2.5 border-b-[0.5px] text-[#9A9A9A]">
                  <p className="text-xs text-[#9A9A9A]">BASE SPIRIT</p>
                  <ChevronRight strokeWidth={1} width={18} className="text-[#9A9A9A]" />
                </div>

                <div className="self-center inline-flex  items-center justify-between w-full px-1 py-2.5 border-b-[0.5px] text-[#9A9A9A]">
                  <p className="text-xs text-[#9A9A9A]">MENU</p>
                  <ChevronRight strokeWidth={1} width={18} className="text-[#9A9A9A]" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-20">
            <div className="flex flex-col gap-6">
              <h4 className="flex gap-3">
                <span className={`${parrisienne.className} text-5xl text-primary`}>Signature</span>{' '}
                <span className={`${playfair.className} text-4xl text-black`}> cocktails </span>
              </h4>

              <div className="flex gap-4 h-108.5">
                <div className="flex flex-col gap-2 flex-1 h-full">
                  <div className="w-full h-full bg-[url('/menu/mangoStickyRice.webp')] bg-cover bg-center bg-no-repeat"></div>
                  <p className={`${playfair.className} text-black text-xl font-medium`}>
                    Mango Sticky Rice
                  </p>
                </div>
                <div className="flex flex-col gap-2 flex-1 h-full">
                  <div className="w-full h-full bg-[url('/menu/matchaMartini.webp')] bg-cover bg-center bg-no-repeat"></div>
                  <p className={`${playfair.className} text-black text-xl font-medium`}>
                    Matcha Martini
                  </p>
                </div>
                <div className="flex flex-col gap-2 flex-1 h-full">
                  <div className="w-full h-full bg-[url('/menu/tepacheSour.webp')] bg-cover bg-center bg-no-repeat"></div>
                  <p className={`${playfair.className} text-black text-xl font-medium`}>
                    Tepache Sour
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="flex gap-3">
                <span className={`${parrisienne.className} text-5xl text-primary`}>Signature</span>{' '}
                <span className={`${playfair.className} text-4xl text-black`}> cocktails </span>
              </h4>

              <div className="flex gap-4 h-108.5">
                <div className="flex flex-col gap-2 flex-1 h-full">
                  <div className="w-full h-full bg-[url('/menu/mangoStickyRice.webp')] bg-cover bg-center bg-no-repeat"></div>
                  <p className={`${playfair.className} text-black text-xl font-medium`}>
                    Mango Sticky Rice
                  </p>
                </div>
                <div className="flex flex-col gap-2 flex-1 h-full">
                  <div className="w-full h-full bg-[url('/menu/matchaMartini.webp')] bg-cover bg-center bg-no-repeat"></div>
                  <p className={`${playfair.className} text-black text-xl font-medium`}>
                    Matcha Martini
                  </p>
                </div>
                <div className="flex flex-col gap-2 flex-1 h-full">
                  <div className="w-full h-full bg-[url('/menu/tepacheSour.webp')] bg-cover bg-center bg-no-repeat"></div>
                  <p className={`${playfair.className} text-black text-xl font-medium`}>
                    Tepache Sour
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="flex gap-3">
                <span className={`${parrisienne.className} text-5xl text-primary`}>Signature</span>{' '}
                <span className={`${playfair.className} text-4xl text-black`}> cocktails </span>
              </h4>

              <div className="flex gap-4 h-108.5">
                <div className="flex flex-col gap-2 flex-1 h-full">
                  <div className="w-full h-full bg-[url('/menu/mangoStickyRice.webp')] bg-cover bg-center bg-no-repeat"></div>
                  <p className={`${playfair.className} text-black text-xl font-medium`}>
                    Mango Sticky Rice
                  </p>
                </div>
                <div className="flex flex-col gap-2 flex-1 h-full">
                  <div className="w-full h-full bg-[url('/menu/matchaMartini.webp')] bg-cover bg-center bg-no-repeat"></div>
                  <p className={`${playfair.className} text-black text-xl font-medium`}>
                    Matcha Martini
                  </p>
                </div>
                <div className="flex flex-col gap-2 flex-1 h-full">
                  <div className="w-full h-full bg-[url('/menu/tepacheSour.webp')] bg-cover bg-center bg-no-repeat"></div>
                  <p className={`${playfair.className} text-black text-xl font-medium`}>
                    Tepache Sour
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}