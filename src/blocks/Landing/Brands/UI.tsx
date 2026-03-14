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
    <div className="py-14 lg:py-20 pt-24 lg:pt-30 px-4 md:px-8">
      <div className="size-full flex flex-col justify-center gap-4 max-w-7xl mx-auto">
        <h4 className="font-medium text-2xl text-black text-center">
          {heading}
        </h4>
 
        <div className="w-full mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <BrandCarousel logos={resolvedLogos} />
        </div>
      </div>
    </div>
  )
}