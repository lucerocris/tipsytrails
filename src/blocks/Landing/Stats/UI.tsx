import Image from "next/image";
import { playfair } from "@/app/(frontend)/fonts";

type StatItem = {
  value: string
  label: string
  id?: string | null
}

type ImageItem = {
  image: {
    url?: string | null
    alt?: string
  } | number
  id?: string | null
}

type StatsProps = {
  eyebrow: string
  heading: string
  headingContinued?: string | null
  headingHighlight?: string | null
  stats: StatItem[]
  images: ImageItem[]
}

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

function resolveUrl(image: ImageItem['image']): string {
  if (typeof image === 'number' || !image) return '/placeholder.png'
  if (!image.url) return '/placeholder.png'
  return image.url.startsWith('http') ? image.url : `${SERVER_URL}${image.url}`
}

function resolveAlt(image: ImageItem['image']): string {
  if (typeof image === 'number' || !image) return ''
  return image.alt ?? ''
}

export function StatsBlockUI({
  eyebrow,
  heading,
  headingContinued,
  headingHighlight,
  stats,
  images,
}: StatsProps) {
  const [featured, ...grid] = images ?? [];
  const featuredUrl = featured ? resolveUrl(featured.image) : '/placeholder.png';
  const featuredAlt = featured ? resolveUrl(featured.image) : '';
  
  return (
    <div className = "py-14 md:py-20 px-4 md:px-8">
      <div className = "w-full h-fit flex flex-col justify-center gap-10 max-w-7xl mx-auto">
        <div className = "flex flex-col gap-10">
          <div className = "flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-end w-full">
            <div className = "flex flex-col gap-2">
              <p className="text-sm lg:text-base">{eyebrow}</p>
              <h2 className = "flex flex-col gap-1 text-2xl md:text-4xl lg:text-5xl font-medium">
                {heading}
                {(headingContinued || headingHighlight) && (
                  <span>
                    {headingContinued}
                    {headingHighlight && (
                      <span className = {`${playfair.className} text-primary`}>
                        {' '}{headingHighlight}
                      </span>
                    )}
                  </span>
                )}
              </h2>
            </div>
            
            {stats && stats.length > 0 && (
              <div className = "grid grid-cols-3 gap-4 lg:gap-18 w-full lg:max-w-150 lg:w-auto">
                {stats.map((stat, i) => (
                  <div key = {stat.id ?? i} className = "flex flex-col items-center justify-start gap-1">
                    <p className="text-primary font-semibold text-4xl">{stat.value}</p>
                    <p className="text-[#9A9A9A] text-sm font-medium text-center leading-tight">{ stat.label }</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className = "flex flex-col lg:flex-row gap-3">
            <div className = "flex-1 aspect-square w-full relative overflow-hidden bg-gray-100">
              <Image
                src={featuredUrl}
                alt={featuredAlt}
                fill
                className="object-cover"
                sizes = "(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {grid.length > 0 && (
              <div className = "flex-1 grid grid-cols-2 grid-rows-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => {
                  const item = grid[i];
                  const url = item ? resolveUrl(item.image) : '/placeholder.png';
                  const alt = item ? resolveUrl(item.image) : '';
                  
                  return (
                    <div key={i} className = "w-full aspect-square relative overflow-hidden bg-gray-200">
                      {item && (
                        <Image
                          src={url}
                          alt={alt}
                          fill
                          className="object-cover"
                          sizes = "(max-width: 1024px) 50vw, 25vw"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}