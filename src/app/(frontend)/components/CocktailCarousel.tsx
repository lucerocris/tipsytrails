'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { DrinkCard } from './DrinkCard'
// Define types based on your Payload structure
interface CocktailCarouselProps {
  drinks: any[]
  baseUrl: string
  categoryName?: string
  cardsPerView?: 3 | 4
}

const cardBasisClass: Record<3 | 4, string> = {
  3: 'min-w-0 flex-[0_0_80%] md:flex-[0_0_calc(50%_-_0.75rem)] lg:flex-[0_0_calc(33.333%_-_1rem)]',
  4: 'min-w-0 flex-[0_0_85%] md:flex-[0_0_calc(50%_-_0.75rem)] lg:flex-[0_0_calc(33.333%_-_1rem)] xl:flex-[0_0_calc(25%_-_1.125rem)]',
}

export function CocktailCarousel({
  drinks,
  baseUrl,
  categoryName,
  cardsPerView = 4,
}: CocktailCarouselProps) {
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

  if (!drinks.length) return null

  const canScroll = canScrollPrev || canScrollNext

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        {categoryName ? (
          <div className="flex flex-col gap-4">
            <p className="eyebrow">
              {drinks.length} {drinks.length === 1 ? 'drink' : 'drinks'}
            </p>
            <h3 className="display-m">
              <span className="accent">{categoryName.split(' ')[0]}</span>{' '}
              {categoryName.split(' ').slice(1).join(' ')}
            </h3>
          </div>
        ) : (
          <div />
        )}

        {canScroll && (
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous cocktails"
              className="icon-btn"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next cocktails"
              className="icon-btn"
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* carousel container: keep this structure + css */}
        <div className="flex gap-6">
          {drinks.map((drink, idx) => {
            // Resolve the image when it's populated (object) or not (number/undefined)
            const image = drink.image && typeof drink.image === 'object' ? drink.image : null

            // Debug: warn during development when image is not populated
            if (!image && process.env.NODE_ENV !== 'production') {
              // eslint-disable-next-line no-console
              console.warn('[CocktailCarousel] cocktail missing populated image:', {
                id: drink?.id,
                name: drink?.name,
                rawImage: drink?.image,
                index: idx,
              })
            }

            const imageUrl = image?.url
              ? image.url.startsWith('http')
                ? image.url
                : `${baseUrl}${image.url}`
              : '/placeholder.png'

            return (
              <div key={`${drink.id ?? idx}-${idx}`} className={cardBasisClass[cardsPerView]}>
                <DrinkCard name={drink.name} imageUrl={imageUrl} index={idx} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
