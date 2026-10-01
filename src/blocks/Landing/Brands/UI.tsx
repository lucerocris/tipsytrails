import { BrandCarousel } from "@/app/(frontend)/components/BrandCarousel"
import { SERVER_URL } from "@/utilities/url"

type LogoItem = {
  image: {
    url?: string | null
    alt?: string | null
  } | number
  alt?: string | null
  height?: string | null
  id?: string | null
}


type BrandsBlockProps = {
  heading: string
  logos?: LogoItem[] | null
}

export function BrandsBlockUI({
  heading,
  logos
}: BrandsBlockProps) {

  const resolvedLogos = (logos ?? []).map((item) => {
    const img = typeof item.image === 'object' && item.image !== null ? item.image : null
    const rawUrl = img?.url ?? null
    const url = rawUrl
      ? rawUrl.startsWith('http')
        ? rawUrl
        : `${SERVER_URL}${rawUrl}`
      : '/placeholder.png';

    return {
      src: url,
      alt: item.alt || (img && 'alt' in img ? img.alt ?? '' : '') || 'Brand Logo',
      className: item.height ?? 'h-8'
    }
  });

  return (
    <section className="pt-14 md:pt-20">
      <div className="wrap flex flex-col gap-6">
        <p className="eyebrow text-center">{heading}</p>

        <div className="w-full border-y border-line mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <BrandCarousel logos={resolvedLogos} />
        </div>
      </div>
    </section>
  )
}
