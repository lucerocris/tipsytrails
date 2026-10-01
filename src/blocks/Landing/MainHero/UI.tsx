import { Button } from '@/app/(frontend)/components/Button'
import { Martini } from 'lucide-react'
import Image from 'next/image'

type HeroProps = {
  heading: string
  headingHighlight?: string
  description?: string
  backgroundImage?: any
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

export const HeroBlockUI = ({
  heading,
  headingHighlight,
  description,
  backgroundImage,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: HeroProps) => {
  const bgUrl =
    typeof backgroundImage === 'object' && backgroundImage?.url
      ? backgroundImage.url
      : '/placeholder.png'

  return (
    <section className="pt-12 md:pt-20 lg:pt-24">
      <div className="wrap flex flex-col items-start md:items-center md:text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1.5 text-sm text-primary">
          <Martini className="size-3.5" aria-hidden="true" />
          Weddings, birthdays &amp; corporate events
        </p>

        <h1 className="display-xl mt-6">
          {heading} {headingHighlight && <span className="accent md:block">{headingHighlight}</span>}
        </h1>

        {description && <p className="lead mt-5 max-w-xl">{description}</p>}

        <div className="mt-8 flex w-full flex-row flex-wrap gap-2 md:w-auto">
          {primaryButtonText && primaryButtonLink && (
            <Button href={primaryButtonLink} className="flex-1 md:flex-none">
              {primaryButtonText}
            </Button>
          )}

          {secondaryButtonText && secondaryButtonLink && (
            <Button href={secondaryButtonLink} variant="skeleton" className="flex-1 md:flex-none">
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>

      {/* The work carries the color; the frame around it stays quiet */}
      <div className="wrap-wide mt-12 md:mt-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-m bg-paper-3 sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={bgUrl}
            alt={
              typeof backgroundImage === 'object'
                ? backgroundImage?.alt || 'Hero background'
                : 'Hero background'
            }
            fill
            unoptimized
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  )
}
