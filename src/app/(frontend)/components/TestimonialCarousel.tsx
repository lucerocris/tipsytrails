'use client'

import React, { useCallback, useEffect, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { Testimonial } from "@/payload-types"

interface TestimonialCarouselProps {
    testimonial: Testimonial[];
    baseUrl: string;
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

export function TestimonialCarousel({ testimonial, baseUrl }: TestimonialCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        containScroll: 'trimSnaps',
    })

    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)
    const [snapCount, setSnapCount] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const progressFillRef = useRef<HTMLDivElement | null>(null)
    const rafRef = useRef<number | null>(null)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
        setSelectedIndex(emblaApi.selectedScrollSnap())
        setSnapCount(emblaApi.scrollSnapList().length)
    }, [emblaApi])

    const updateProgress = useCallback(() => {
        if (!emblaApi) return

        if (rafRef.current !== null) return
        rafRef.current = window.requestAnimationFrame(() => {
            rafRef.current = null
            const raw = emblaApi.scrollProgress()
            const clamped = Math.min(1, Math.max(0, raw))
            if (progressFillRef.current) {
                progressFillRef.current.style.transform = `scaleX(${clamped})`
            }
        })
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        updateProgress()
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', updateProgress)
        emblaApi.on('select', updateProgress)
        emblaApi.on('scroll', updateProgress)
        return () => {
            emblaApi.off('reInit', onSelect)
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', updateProgress)
            emblaApi.off('select', updateProgress)
            emblaApi.off('scroll', updateProgress)
            if (rafRef.current !== null) {
                window.cancelAnimationFrame(rafRef.current)
                rafRef.current = null
            }
        }
    }, [emblaApi, onSelect, updateProgress])

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    if (!testimonial.length) return null;

    return (
        <div className="w-full">
            <div className="embla overflow-hidden w-full" ref={emblaRef}>
                <div className="embla_container flex min-w-0 gap-6">
                    {testimonial.map((t, idx) => {
                    const avatar = t.avatar && typeof t.avatar === 'object' ? t.avatar : null;
                    const avatarUrl = avatar?.url
                        ? avatar.url.startsWith('http')
                            ? avatar.url
                            : `${baseUrl}${avatar.url}`
                        : '/placeholder.png'
                    return (
                        <div
                            key={`${t.id}-${idx}`}
                            className="embla__slide flex-[0_0_100%] md:flex-[0_0_calc((100%_-_3rem)/3)] min-w-0"
                        >
                            <div className="flex flex-col justify-between h-112.5 bg-primary rounded-sm p-11">
                                <div className="flex flex-col gap-9">
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-300 mb-4">
                                        <Image
                                            src={avatarUrl}
                                            alt={avatar?.alt || t.clientName}
                                            fill
                                            sizes="56px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <p className="font-medium text-md text-white leading-relaxed line-clamp-6">
                                        "{t.quote}"
                                    </p>
                                </div>

                                <div className="flex flex-col text-white mt-4">
                                    <p className="font-semibold text-md">{t.clientName}</p>
                                    {t.clientRole ? <p className="text-sm opacity-80">{t.clientRole}</p> : null}
                                </div>
                            </div>
                        </div>
                    )
                    })}
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-4">
                {snapCount > 1 ? (
                    <div className="flex items-center gap-3">
                        <div
                            className="h-1 w-16 rounded-full bg-black/10 overflow-hidden"
                            aria-hidden="true"
                        >
                            <div
                                ref={progressFillRef}
                                className="h-full w-full origin-left rounded-full bg-black/60 will-change-transform"
                                style={{ transform: 'scaleX(0)' }}
                            />
                        </div>
                        <span className="sr-only">
                            Testimonial {selectedIndex + 1} of {snapCount}
                        </span>
                    </div>
                ) : null}
                <button
                    type="button"
                    onClick={scrollPrev}
                    disabled={!canScrollPrev}
                    aria-label="Previous testimonials"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-black/10 text-black transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ArrowIcon direction="left" />
                </button>
                <button
                    type="button"
                    onClick={scrollNext}
                    disabled={!canScrollNext}
                    aria-label="Next testimonials"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-black/10 text-black transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ArrowIcon direction="right" />
                </button>
            </div>
        </div>
    )
}
