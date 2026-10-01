'use client'

import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { CocktailCarousel } from '@/app/(frontend)/components/CocktailCarousel'
import { DrinkCard } from '@/app/(frontend)/components/DrinkCard'
import { useEffect, useMemo, useState } from 'react'
import { PageHeroUI } from '@/blocks/PageHero/UI'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const baseSpirits = ['VODKA', 'GIN', 'RUM', 'WHISKY', 'SOUR', 'WINE-BASED', 'SPRITZERS'] as const
const menuFilters = ['CLASSIC', 'PREMIUM', 'SIGNATURE', 'MOCKTAILS'] as const

type BaseSpirit = (typeof baseSpirits)[number]
type MenuFilter = (typeof menuFilters)[number]

type MenuDrink = {
  id: number
  name: string
  image: { url: string }
  baseSpirit: BaseSpirit
}

type MenuCategory = {
  name: string
  menuType: MenuFilter
  drinks: MenuDrink[]
}

const menuCategories: MenuCategory[] = [
  {
    name: 'Classic Menu',
    menuType: 'CLASSIC',
    drinks: [
      {
        id: 101,
        name: 'Old Fashioned',
        image: { url: '/menu/mangoStickyRice.webp' },
        baseSpirit: 'WHISKY',
      },
      { id: 102, name: 'Negroni', image: { url: '/menu/matchaMartini.webp' }, baseSpirit: 'GIN' },
      {
        id: 103,
        name: 'Whiskey Sour',
        image: { url: '/menu/tepacheSour.webp' },
        baseSpirit: 'SOUR',
      },
      { id: 104, name: 'Mojito', image: { url: '/menu/mangoStickyRice.webp' }, baseSpirit: 'RUM' },
      {
        id: 105,
        name: 'Tom Collins',
        image: { url: '/menu/matchaMartini.webp' },
        baseSpirit: 'GIN',
      },
    ],
  },
  {
    name: 'Premium Menu',
    menuType: 'PREMIUM',
    drinks: [
      {
        id: 201,
        name: 'Gold Rush Royale',
        image: { url: '/menu/matchaMartini.webp' },
        baseSpirit: 'RUM',
      },
      {
        id: 202,
        name: 'Smoked Boulevardier',
        image: { url: '/menu/tepacheSour.webp' },
        baseSpirit: 'WHISKY',
      },
      {
        id: 203,
        name: 'Saffron Martini',
        image: { url: '/menu/mangoStickyRice.webp' },
        baseSpirit: 'RUM',
      },
      {
        id: 204,
        name: 'Black Truffle Negroni',
        image: { url: '/menu/matchaMartini.webp' },
        baseSpirit: 'GIN',
      },
      {
        id: 205,
        name: 'Velvet Manhattan',
        image: { url: '/menu/tepacheSour.webp' },
        baseSpirit: 'RUM',
      },
    ],
  },
  {
    name: 'Signature Cocktails',
    menuType: 'SIGNATURE',
    drinks: [
      {
        id: 301,
        name: 'Mango Sticky Rice',
        image: { url: '/menu/mangoStickyRice.webp' },
        baseSpirit: 'RUM',
      },
      {
        id: 302,
        name: 'Matcha Martini',
        image: { url: '/menu/matchaMartini.webp' },
        baseSpirit: 'VODKA',
      },
      {
        id: 303,
        name: 'Tepache Sour',
        image: { url: '/menu/tepacheSour.webp' },
        baseSpirit: 'SOUR',
      },
      {
        id: 304,
        name: 'Calamansi Sunset',
        image: { url: '/menu/mangoStickyRice.webp' },
        baseSpirit: 'GIN',
      },
      { id: 305, name: 'Ube Cloud', image: { url: '/menu/matchaMartini.webp' }, baseSpirit: 'RUM' },
    ],
  },
  {
    name: 'Mocktail Menu',
    menuType: 'MOCKTAILS',
    drinks: [
      {
        id: 401,
        name: 'Citrus Bloom',
        image: { url: '/menu/tepacheSour.webp' },
        baseSpirit: 'SPRITZERS',
      },
      {
        id: 402,
        name: 'Berry Basil Fizz',
        image: { url: '/menu/mangoStickyRice.webp' },
        baseSpirit: 'SPRITZERS',
      },
      {
        id: 403,
        name: 'Tropical Iced Tea',
        image: { url: '/menu/matchaMartini.webp' },
        baseSpirit: 'WINE-BASED',
      },
      {
        id: 404,
        name: 'Virgin Mojito',
        image: { url: '/menu/tepacheSour.webp' },
        baseSpirit: 'SPRITZERS',
      },
      {
        id: 405,
        name: 'Cucumber Cooler',
        image: { url: '/menu/mangoStickyRice.webp' },
        baseSpirit: 'SPRITZERS',
      },
    ],
  },
]

const chipClass =
  'meta rounded-xs border px-2 py-1.5 transition-colors duration-150'
const chipOnClass = 'border-primary bg-tint text-primary!'
const chipOffClass = 'border-line text-ink-75! hover:bg-paper-3'

function AccordionSection({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-line py-4">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex items-center justify-between w-full"
      >
        <span className="eyebrow">{label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`size-4 text-ink-75 transition-transform duration-300 ease-in-out ${
            isOpen ? 'rotate-0' : '-rotate-90'
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-1.5 pt-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

export type HeroBlock = {
  eyebrow?: string | null
  heading: string
  headingScript?: string | null
  backgroundImage?: any
} | null

export function MenuClient({ heroBlock }: { heroBlock: HeroBlock }) {
  const [isBaseSpiritOpen, setIsBaseSpiritOpen] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [selectedBaseSpirits, setSelectedBaseSpirits] = useState<BaseSpirit[]>([])
  const [selectedMenu, setSelectedMenu] = useState<MenuFilter | null>(null)

  useEffect(() => {
    document.body.style.overflow = isMobileFilterOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileFilterOpen])

  const toggleBaseSpirit = (baseSpirit: BaseSpirit) => {
    setSelectedBaseSpirits((prev) =>
      prev.includes(baseSpirit)
        ? prev.filter((item) => item !== baseSpirit)
        : [...prev, baseSpirit],
    )
  }

  const toggleMenu = (menu: MenuFilter) => {
    setSelectedMenu((prev) => (prev === menu ? null : menu))
  }

  const filteredDrinks = useMemo(() => {
    const drinks = menuCategories
      .filter((category) => (selectedMenu ? category.menuType === selectedMenu : true))
      .flatMap((category) => category.drinks)
    return !selectedBaseSpirits.length
      ? drinks
      : drinks.filter((drink) => selectedBaseSpirits.includes(drink.baseSpirit))
  }, [selectedBaseSpirits, selectedMenu])

  const selectedFilterTitle = useMemo(() => {
    const labels = [
      ...selectedBaseSpirits.map((s) => s.charAt(0) + s.slice(1).toLowerCase()),
      ...(selectedMenu ? [selectedMenu.charAt(0) + selectedMenu.slice(1).toLowerCase()] : []),
    ]
    return labels.length ? labels.join(', ') : 'All Cocktails'
  }, [selectedBaseSpirits, selectedMenu])

  const hasActiveFilters = selectedBaseSpirits.length > 0 || Boolean(selectedMenu)

  const filterSections = (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setSelectedBaseSpirits([])
            setSelectedMenu(null)
          }}
          disabled={!hasActiveFilters}
          className="link-arrow text-xs! disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear all
        </button>
      </div>

      <AccordionSection
        label="Base Spirit"
        isOpen={isBaseSpiritOpen}
        onToggle={() => setIsBaseSpiritOpen((v) => !v)}
      >
        {baseSpirits.map((spirit) => (
          <button
            key={spirit}
            onClick={() => toggleBaseSpirit(spirit)}
            aria-pressed={selectedBaseSpirits.includes(spirit)}
            className={`${chipClass} ${
              selectedBaseSpirits.includes(spirit) ? chipOnClass : chipOffClass
            }`}
          >
            {spirit}
          </button>
        ))}
      </AccordionSection>

      <AccordionSection label="Menu" isOpen={isMenuOpen} onToggle={() => setIsMenuOpen((v) => !v)}>
        {menuFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => toggleMenu(filter)}
            aria-pressed={selectedMenu === filter}
            className={`${chipClass} ${selectedMenu === filter ? chipOnClass : chipOffClass}`}
          >
            {filter}
          </button>
        ))}
      </AccordionSection>
    </div>
  )

  return (
    <>
      <PageHeroUI
        heading={heroBlock?.heading ?? 'MEET OUR'}
        headingScript={heroBlock?.headingScript ?? 'menu'}
        backgroundImage={heroBlock?.backgroundImage}
      />

      <div className="wrap section">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="hidden lg:block w-60 shrink-0 sticky top-24 self-start">
            {filterSections}
          </aside>

          <div className="flex-1 min-w-0">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden btn btn-secondary mb-8"
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {filteredDrinks.length}
                </span>
              )}
            </button>

            {hasActiveFilters ? (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <p className="eyebrow">
                    {filteredDrinks.length} {filteredDrinks.length === 1 ? 'drink' : 'drinks'}
                  </p>
                  <h2 className="display-m">{selectedFilterTitle}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                  {filteredDrinks.map((drink, i) => (
                    <DrinkCard key={drink.id} name={drink.name} imageUrl={drink.image.url} index={i} />
                  ))}
                  {!filteredDrinks.length && (
                    <p className="text-base text-ink-75 sm:col-span-2 lg:col-span-3">
                      No drinks match these filters yet.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-16 lg:gap-20">
                {menuCategories.map((cat) => (
                  <CocktailCarousel
                    key={cat.name}
                    categoryName={cat.name}
                    drinks={cat.drinks}
                    baseUrl={baseUrl}
                    cardsPerView={3}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className={`fixed inset-0 z-[60] lg:hidden bg-paper flex flex-col transition-[transform,visibility] duration-300 ease-(--ease-out) ${
          isMobileFilterOpen ? 'visible translate-y-0' : 'invisible translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 h-16 border-b border-line">
          <h3 className="display-s">Filters</h3>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            aria-label="Close filters"
            className="icon-btn"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pt-6">{filterSections}</div>

        <div className="p-4 border-t border-line">
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            disabled={!hasActiveFilters}
            className="btn btn-primary h-12! w-full"
          >
            {hasActiveFilters
              ? `Show ${filteredDrinks.length} result${filteredDrinks.length > 1 ? 's' : ''}`
              : `Show Drinks`}
          </button>
        </div>
      </div>
    </>
  )
}
