import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { parrisienne, playfair } from './layout'
import { BrandCarousel } from '@/app/components/BrandCarousel'

export default async function HomePage() {
  return (
    <>
      {/* hero */}
      <div className="relative h-screen w-full overflow-hidden text-foreground px-[96px] py-16 flex justify-center">
        {/* The Background Image */}
        <Image
          src="/placeholder.png"
          alt="Hero background"
          fill
          unoptimized
          priority
          className="object-cover -z-10" // Moves image behind content
          sizes="100vw"
        />

        {/* The Content Overlay */}
        <div className="relative z-10 flex h-full w-full items-end  max-w-7xl">
          <div className="flex h-auto flex-col gap-1 lg:gap-3">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3.5">
                <h1
                  className={`${playfair.className} text-6xl font-semibold flex flex-col gap-2 text-black`}
                >
                  Cebu's Premium <span className="!text-primary">Mobile Cocktail Bar</span>{' '}
                </h1>
                <p className="text-lg text-black max-w-lg">
                  We bring the bar, you bring the guests. Elevated cocktails & full service for
                  weddings and events.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/"
                  className="inline-flex w-fit items-center justify-center px-5 py-3 text-md font-medium text-white bg-primary rounded-sm"
                >
                  Get My Custom Quote
                </Link>

                <Link
                  href="/"
                  className="inline-flex w-fit items-center justify-center px-5 py-3 text-md font-medium text-primary border-primary border rounded-sm"
                >
                  Book a Tasting Session
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* brands worked with section */}
      <div className="py-20 pt-30">
        {/* content */}
        <div className="w-full h-full flex flex-col justify-center gap-4 max-w-7xl mx-auto">
          <h4 className={`font-medium text-2xl text-black text-center`}>
            Trusted by Cebu event planners and brands
          </h4>

          <div className="w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <BrandCarousel />
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="w-full h-fit flex flex-col justify-center gap-10 max-w-7xl mx-auto">
          <div className="flex flex-col gap-10">
            <div className="flex justify-between items-end w-full">
              <div className="flex flex-col gap-2">
                <p>THE TIPSY TRAILS EXPERIENCE</p>
                <h2 className="flex flex-col gap-1 text-5xl font-medium">
                  Why Cebu's Top Brands
                  <span>
                    & Planners
                    <span className={`${playfair.className} text-primary`}> Choose us </span>
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-18 max-w-[600px]">
                {/* Stat 1 */}
                <div className="flex flex-col items-center justify-start gap-1">
                  <p className="text-primary font-semibold text-4xl">50+</p>
                  <p className="text-[#9A9A9A] text-sm font-medium text-center leading-tight">
                    Events Served
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center justify-start gap-1">
                  <p className="text-primary font-semibold text-4xl">7+</p>
                  <p className="text-[#9A9A9A] text-sm font-medium text-center leading-tight">
                    Years Experience
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center justify-start gap-1">
                  <p className="text-primary font-semibold text-4xl">100%</p>
                  <p className="text-[#9A9A9A] text-sm font-medium text-center leading-tight">
                    Client Satisfaction
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-9">
              <div className="flex-1 h-[600px] w-full bg-[url('/placeholder.png')] bg-cover bg-center bg-no-repeat"></div>{' '}
              <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3">
                <div className="w-full h-full bg-gray-200"></div>
                <div className="w-full h-full bg-gray-200"></div>
                <div className="w-full h-full bg-gray-200"></div>
                <div className="w-full h-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        {/* Content Container (z-10 puts it above the overlay) */}
        <div className="flex flex-col gap-6 justify-center items-center bg-[url('/placeholder.png')] bg-cover bg-center bg-no-repeat h-[65vh]  rounded-sm w-full max-w-7xl mx-auto">
          <div className="relative z-10 flex flex-col gap-2 text-center text-black">
            <p className="tracking-widest text-sm font-semibold uppercase ">COCKTAIL TASTING</p>

            <h2 className="flex flex-col gap-1 text-5xl font-medium max-w-xl">
              Don't Just Guess. Taste Your Menu First.
            </h2>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit items-center justify-center px-5 py-3 text-md font-medium text-white bg-primary rounded-sm"
          >
            Book a tasting session
          </Link>
        </div>
      </div>

      {/*  menu  */}
      <div className="py-20">
        <div className="flex flex-col max-w-7xl mx-auto gap-20">
          <div className="flex flex-col gap-6">
            <h4 className="flex gap-3">
              <span className={`${parrisienne.className} text-5xl text-primary`}>Signature</span>{' '}
              <span className={`${playfair.className} text-4xl text-black`}> cocktails </span>
            </h4>

            <div className="flex gap-4 h-[434px]">
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
              <div className="flex flex-col gap-2 flex-1 h-full">
                <div className="w-full h-full bg-[url('/menu/ubeCheese.webp')] bg-cover bg-center bg-no-repeat"></div>
                <p className={`${playfair.className} text-black text-xl font-medium`}>Ube Cheese</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="flex gap-3">
              <span className={`${parrisienne.className} text-5xl text-primary`}>Signature</span>{' '}
              <span className={`${playfair.className} text-4xl text-black`}> cocktails </span>
            </h4>

            <div className="flex gap-4 h-[434px]">
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
              <div className="flex flex-col gap-2 flex-1 h-full">
                <div className="w-full h-full bg-[url('/menu/ubeCheese.webp')] bg-cover bg-center bg-no-repeat"></div>
                <p className={`${playfair.className} text-black text-xl font-medium`}>Ube Cheese</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* testimonials */}
      <div className="py-20">
        <div className="flex flex-col max-w-7xl mx-auto gap-10">
          <div className="flex flex-col gap-2">
            <p>TESTIMONIALS</p>
            <h2 className="flex flex-col gap-1 text-5xl font-medium">
              Don't take our word for it!
              <span>Hear it from our Clients.</span>
            </h2>
          </div>

          <div className="flex gap-3 h-[532px]">
            <div className="flex flex-col justify-between flex-1 h-full bg-primary rounded-sm p-11">
              <div className="flex flex-col gap-9">
                <div className="w-14 h-14 rounded-full bg-gray-300 mb-4 bg-[url('/placeholder.png')] bg-cover bg-center bg-no-repeat "></div>
                <p className="font-medium text-md text-white leading-relaxed">
                  "Tipsy Trails handled our company launch with absolute professionalism. The setup
                  was sleek, the team was on time, and the branding on the bar was perfect. Highly
                  recommended for corporate events."{' '}
                </p>
              </div>

              <div className="flex flex-col text-white">
                <p className="font-semibold text-md">Cris Lucero</p>
                <p className="text-sm">Marketing Lead, AboitizLand</p>
              </div>
            </div>
            <div className="flex flex-col justify-between flex-1 h-full bg-primary rounded-sm p-11">
              <div className="flex flex-col gap-9">
                <div className="w-14 h-14 rounded-full bg-gray-300 mb-4 bg-[url('/placeholder.png')] bg-cover bg-center bg-no-repeat "></div>
                <p className="font-medium text-md text-white leading-relaxed">
                  "Tipsy Trails handled our company launch with absolute professionalism. The setup
                  was sleek, the team was on time, and the branding on the bar was perfect. Highly
                  recommended for corporate events."{' '}
                </p>
              </div>

              <div className="flex flex-col text-white">
                <p className="font-semibold text-md">Cris Lucero</p>
                <p className="text-sm">Marketing Lead, AboitizLand</p>
              </div>
            </div>
            <div className="flex flex-col justify-between flex-1 h-full bg-primary rounded-sm p-11">
              <div className="flex flex-col gap-9">
                <div className="w-14 h-14 rounded-full bg-gray-300 mb-4 bg-[url('/placeholder.png')] bg-cover bg-center bg-no-repeat "></div>
                <p className="font-medium text-md text-white leading-relaxed">
                  "Tipsy Trails handled our company launch with absolute professionalism. The setup
                  was sleek, the team was on time, and the branding on the bar was perfect. Highly
                  recommended for corporate events."{' '}
                </p>
              </div>

              <div className="flex flex-col text-white">
                <p className="font-semibold text-md">Cris Lucero</p>
                <p className="text-sm">Marketing Lead, AboitizLand</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Form section*/}
      <div className="py-20">
        <div className="flex flex-col max-w-7xl mx-auto gap-10">
          <div className="flex flex-col gap-3 w-full text-center items-center">
            <h2 className={`text-primary ${playfair.className} text-5xl font-medium`}>
              Ready to Elevate your Event?
            </h2>
            <p className="text-black text-lg max-w-xl font-medium">
              Dates fill up fast. Fill in the details below to secure your date. We typically reply
              via <span className="font-bold"> Viber </span> or
              <span className="font-bold"> Messenger </span> for a quicker response.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20 relative">

        <div className="absolute bottom-0 h-70 w-full bg-primary z-10"></div>

        {/* form */}
        <div className="z-20 relative rounded-sm flex flex-col max-w-7xl mx-auto gap-10 bg-[#FFF8E5] h-[700px]"></div>
      </div>

    {/*  footer*/}

      <div className="bg-primary h-screen py-20">
        <div className="flex flex-col justify-end max-w-7xl mx-auto gap-10 h-full">
          <img src="/logoLarge.svg"/>
        </div>
      </div>
    </>
  )
}
