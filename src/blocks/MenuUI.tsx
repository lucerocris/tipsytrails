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
    <div className="py-14 md:py-20 px-4 md:px-8">
      <div className="flex flex-col max-w-7xl mx-auto gap-20">
        <div className="flex flex-col gap-20">
          {resolvedCategories.map((category) => (
            <CocktailCarousel
              key={category.id}
              categoryName={category.name}
              drinks={category.drinks}
              baseUrl={SERVER_URL}
              cardsPerView={perView}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
