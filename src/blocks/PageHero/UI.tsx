import Image from 'next/image'

type PageHeroProps = {
  heading: string
  headingScript: string
  backgroundImage: any
}

export function PageHeroUI({ heading, headingScript, backgroundImage }: PageHeroProps) {
  const bgUrl =
    typeof backgroundImage === 'object' && backgroundImage?.url
      ? backgroundImage.url
      : '/placeholder.png'

  const bgAlt = typeof backgroundImage === 'object' ? backgroundImage?.alt || '' : ''

  return (
    <section className="pt-12 md:pt-20">
      <div className="wrap md:text-center">
        {/* Headings are often entered in capitals; display type is set in sentence case */}
        <h1 className="display-xl">
          <span className="inline-block lowercase first-letter:uppercase">{heading}</span>{' '}
          <span className="accent lowercase">{headingScript}</span>
        </h1>
      </div>

      <div className="wrap-wide mt-10 md:mt-14">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-m bg-paper-3 sm:aspect-[16/9] lg:aspect-[3/1]">
          <Image
            src={bgUrl}
            alt={bgAlt}
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
