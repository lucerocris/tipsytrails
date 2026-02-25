'use client'

import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { parrisienne, playfair } from '@/app/(frontend)/fonts'
// Define types based on your Payload structure
interface CocktailCarouselProps {
  drinks: any[]
  baseUrl: string
  categoryName?: string
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
    >
      {direction === 'left' ? (
        <path
          d="M15 18l-6-6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

export function CocktailCarousel({ drinks, baseUrl, categoryName }: CocktailCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    containScroll: 'trimSnaps',
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('reInit', onSelect)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (!drinks.length) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        {categoryName ? (
          <h4 className="flex gap-3">
            <span className={`${parrisienne.className} text-5xl text-primary`}>
              {categoryName.split(' ')[0]}
            </span>{' '}
            <span className={`${playfair.className} text-4xl text-black`}>
              {categoryName.split(' ').slice(1).join(' ')}
            </span>
          </h4>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous cocktails"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-black/10 text-black transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next cocktails"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-black/10 text-black transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      {/* carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* carousel container: keep this structure + css */}
        <div className="flex gap-4 h-[434px]">
          {drinks.map((drink, idx) => {
            const image = drink.image && typeof drink.image === 'object' ? drink.image : null
            const imageUrl = image?.url
              ? image.url.startsWith('http')
                ? image.url
                : `${baseUrl}${image.url}`
              : '/placeholder.png'

            return (
              <div
                key={`${drink.id}-${idx}`}
                className="min-w-0 flex-[0_0_calc(25%-12px)]"
              >
                <div className="flex flex-col gap-2 flex-1 h-full">
                  <div
                    className="w-full h-full bg-[url('/menu/mangoStickyRice.webp')] bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${imageUrl}')` }}
                  />
                  <p className={`${playfair.className} text-black text-xl font-medium`}>
                    {drink.name}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}