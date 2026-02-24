'use client'

import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"
import Image from "next/image"
import { Testimonial } from "@/payload-types"

interface TestimonialCarouselProps {
    testimonial: Testimonial[];
    baseUrl: string;
}

export function TestimonialCarousel({ testimonial, baseUrl }: TestimonialCarouselProps) {
    const [emblaRef] = useEmblaCarousel({
        loop: true,
        align: 'start',
    }, [
        AutoScroll({
            speed: 1,
            stopOnInteraction: false,
            playOnInit: true,
            stopOnMouseEnter: true,
        }),
    ]);

    if (!testimonial.length) return null;

    const displayTestimonials = testimonial.length < 6
        ? [...testimonial, ...testimonial, ...testimonial]
        : testimonial;

    return (
        <div className = "embla overflow-hidden w-full" ref = {emblaRef}>
            <div className = "embla_container flex min-w-0">
                {displayTestimonials.map((t, idx) => {
                    const avatar = t.avatar && typeof t.avatar === 'object' ? t.avatar : null;
                    const avatarUrl = avatar?.url
                        ? avatar.url.startsWith('http')
                            ? avatar.url
                            : `${baseUrl}${avatar.url}`
                        : '/placeholder.png'
                return (
                    <div key={`${t.id}-${idx}`} className="embla__slide flex-[0_0_90%] md:flex-[0_0_33.33%] min-w-0 px-3">
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
    )
}
