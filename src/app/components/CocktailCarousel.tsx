'use client'

import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"
import Image from 'next/image'
// Define types based on your Payload structure
interface CocktailCarouselProps {
  drinks: any[]
  baseUrl: string
}

export function CocktailCarousel({ drinks, baseUrl }: CocktailCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
  }, [
    AutoScroll({ 
      speed: 1.5, 
      stopOnInteraction: false, 
      playOnInit: true,
      stopOnMouseEnter: true,
    }),
  ]);

  // If no drinks, don't render
  if (!drinks.length) return null;

  // Duplicate the array to ensure smooth infinite scrolling for small lists
  const displayDrinks = drinks.length < 10 ? [...drinks, ...drinks, ...drinks] : drinks;

  return (
    <div className="embla overflow-hidden w-full" ref={emblaRef}>
      <div className="embla__container flex min-w-0">
        {displayDrinks.map((drink, idx) => {
          const image = drink.image && typeof drink.image === 'object' ? drink.image : null
          const imageUrl = image?.url
            ? image.url.startsWith('http')
              ? image.url
              : `${baseUrl}${image.url}`
            : '/placeholder.png'
          const imageAlt = image?.alt || drink.name

          return (
            <div key={`${drink.id}-${idx}`} className="embla__slide flex-[0_0_70%] sm:flex-[0_0_45%] md:flex-[0_0_25%] min-w-0 px-2">
              <div className="flex flex-col gap-2 h-full">
                <div className="relative w-full h-80 bg-gray-100 rounded-sm overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    sizes="(min-width: 768px) 300px, 280px"
                    className="object-cover"
                  />
                </div>
                <p className={`font-playfair text-black text-xl font-medium`}>
                  {drink.name}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}