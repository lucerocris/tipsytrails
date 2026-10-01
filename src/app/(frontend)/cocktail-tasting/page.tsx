import React from 'react'
import { Button } from '@/app/(frontend)/components/Button'
import { PageHeroUI } from '@/blocks/PageHero/UI'

const stops = [
  {
    title: 'Send your event details',
    description:
      'Fill in the inquiry form with your date, venue and guest count. We reply over Viber or Messenger.',
  },
  {
    title: 'Taste the menu',
    description:
      'Sit down with our bartenders and try the cocktails you have in mind before you commit to any of them.',
  },
  {
    title: 'Lock your line-up',
    description:
      'Pick the drinks your guests will get. We build the bar for your event around that list.',
  },
]

export default function CockTailTastingPage() {
  return (
    <>
      <PageHeroUI heading="Cocktail" headingScript="tasting" backgroundImage={null} />

      <section className="section">
        <div className="wrap flex flex-col gap-12 md:gap-16">
          <div className="reveal flex flex-col gap-4">
            <p className="eyebrow">How a tasting works</p>
            <h2 className="display-l">
              Three stops between
              <span className="block">
                you and <span className="accent">your menu.</span>
              </span>
            </h2>
            <p className="lead max-w-xl">
              Don&apos;t guess what your guests will drink. Try it first, then book the bar.
            </p>
          </div>

          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            <div
              className="absolute left-[5px] top-0 bottom-0 border-l border-dashed border-ink/25 md:left-0 md:right-0 md:top-[5px] md:bottom-auto md:border-l-0 md:border-t"
              aria-hidden="true"
            />

            {stops.map((stop, i) => (
              <li key={stop.title} className="reveal relative flex flex-col gap-3 pl-9 md:pl-0 md:pt-10">
                <span className="trail-dot absolute left-0 top-1 md:top-0" aria-hidden="true" />
                <p className="meta">Stop {String(i + 1).padStart(2, '0')}</p>
                <h3 className="display-s">{stop.title}</h3>
                <p className="max-w-sm text-base text-ink-75">{stop.description}</p>
              </li>
            ))}
          </ol>

          <Button href="#inquiry">Book my tasting</Button>
        </div>
      </section>
    </>
  )
}
