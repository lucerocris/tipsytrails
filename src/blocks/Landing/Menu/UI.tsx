import Link from 'next/link'
import { CocktailCarousel } from '@/app/(frontend)/components/CocktailCarousel'
import type { Cocktail } from '@/payload-types'

type ResolvedCategory = {
  id: number
  name: string
  drinks: Cocktail[]
}

type MenuBlockProps = {
  cardsPerView?: '3' | '4' | null
  resolvedCategories?: ResolvedCategory[]
}

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ??
  process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL ??
  'http://localhost:3000'

export function MenuBlockUI({ cardsPerView, resolvedCategories = [] }: MenuBlockProps) {
  if (!resolvedCategories.length) return null

  const perView = cardsPerView === '3' ? 3 : 4

  return (
    <section className="section">
      <div className="wrap flex flex-col gap-16 md:gap-20">
        {resolvedCategories.map((category) => (
          <CocktailCarousel
            key={category.id}
            categoryName={category.name}
            drinks={category.drinks}
            baseUrl={SERVER_URL}
            cardsPerView={perView}
          />
        ))}

        <Link href="/menu" className="link-arrow w-fit">
          Show me the full menu →
        </Link>
      </div>
    </section>
  )
}
