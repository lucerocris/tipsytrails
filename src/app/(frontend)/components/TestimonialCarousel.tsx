'use client'

import React, { useCallback, useEffect, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Testimonial } from "@/payload-types"

interface TestimonialCarouselProps {
    testimonial: Testimonial[];
    baseUrl: string;
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
                            className="embla__slide flex-[0_0_85%] md:flex-[0_0_calc(50%_-_0.75rem)] lg:flex-[0_0_calc((100%_-_3rem)/3)] min-w-0"
                        >
                            <figure className="flex h-full min-h-[340px] flex-col justify-between gap-10 rounded-s border border-line bg-paper p-6 md:p-8">
                                <blockquote className="font-display text-[26px] leading-[1.15] tracking-[-0.01em] text-ink line-clamp-6">
                                    “{t.quote}”
                                </blockquote>

                                <figcaption className="flex items-center gap-3">
                                    <div className="relative size-12 shrink-0 overflow-hidden rounded-s bg-paper-3">
                                        <Image
                                            src={avatarUrl}
                                            alt={avatar?.alt || t.clientName}
                                            fill
                                            sizes="48px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-base font-semibold text-ink">{t.clientName}</p>
                                        {t.clientRole ? <p className="text-[13px] text-ink-75">{t.clientRole}</p> : null}
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    )
                    })}
                </div>
            </div>

            <div className="mt-8 hidden sm:flex items-center justify-end gap-4">
                {snapCount > 1 ? (
                    <div className="flex items-center gap-3">
                        <div
                            className="h-0.5 w-24 bg-line overflow-hidden"
                            aria-hidden="true"
                        >
                            <div
                                ref={progressFillRef}
                                className="h-full w-full origin-left bg-ink will-change-transform"
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
                    className="icon-btn"
                >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                </button>
                <button
                    type="button"
                    onClick={scrollNext}
                    disabled={!canScrollNext}
                    aria-label="Next testimonials"
                    className="icon-btn"
                >
                    <ArrowRight className="size-4" aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}
