import Image from "next/image";

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
  const featuredAlt = featured ? resolveAlt(featured.image) : '';
  
  return (
    <section className = "section">
      <div className = "wrap flex flex-col gap-12 md:gap-16">
        <div className = "flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className = "reveal flex flex-col gap-4">
            <p className = "eyebrow">{eyebrow}</p>
            <h2 className = "display-l">
              {heading}
              {(headingContinued || headingHighlight) && (
                <span className = "block">
                  {headingContinued}
                  {headingHighlight && (
                    <span className = "accent">
                      {' '}{headingHighlight}
                    </span>
                  )}
                </span>
              )}
            </h2>
          </div>
          
          {stats && stats.length > 0 && (
            <dl className = "reveal grid grid-cols-3 divide-x divide-line rounded-s border border-line lg:min-w-[460px]">
              {stats.map((stat, i) => (
                <div key = {stat.id ?? i} className = "flex flex-col-reverse gap-2 px-4 py-5 md:px-6 md:py-6">
                  <dt className = "text-[13px] leading-tight text-ink-75">{stat.label}</dt>
                  <dd className = "display-m">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        
        <div className = "flex flex-col gap-3 lg:flex-row">
          <div className = "reveal relative aspect-square w-full flex-1 overflow-hidden rounded-s bg-paper-3">
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
                const alt = item ? resolveAlt(item.image) : '';
                
                return (
                  <div key={i} className = "reveal relative aspect-square w-full overflow-hidden rounded-s bg-paper-3">
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
    </section>
  )
}
