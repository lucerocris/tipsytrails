'use client'

import Image from 'next/image'
import { parrisienne, playfair } from '@/app/(frontend)/fonts'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { CocktailCarousel } from '@/app/(frontend)/components/CocktailCarousel'
import { useEffect, useMemo, useState } from 'react'

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
      { id: 101, name: 'Old Fashioned', image: { url: '/menu/mangoStickyRice.webp' }, baseSpirit: 'WHISKY' },
      { id: 102, name: 'Negroni', image: { url: '/menu/matchaMartini.webp' }, baseSpirit: 'GIN' },
      { id: 103, name: 'Whiskey Sour', image: { url: '/menu/tepacheSour.webp' }, baseSpirit: 'SOUR' },
      { id: 104, name: 'Mojito', image: { url: '/menu/mangoStickyRice.webp' }, baseSpirit: 'RUM' },
      { id: 105, name: 'Tom Collins', image: { url: '/menu/matchaMartini.webp' }, baseSpirit: 'GIN' },
    ],
  },
  {
    name: 'Premium Menu',
    menuType: 'PREMIUM',
    drinks: [
      { id: 201, name: 'Gold Rush Royale', image: { url: '/menu/matchaMartini.webp' }, baseSpirit: 'RUM' },
      { id: 202, name: 'Smoked Boulevardier', image: { url: '/menu/tepacheSour.webp' }, baseSpirit: 'WHISKY' },
      { id: 203, name: 'Saffron Martini', image: { url: '/menu/mangoStickyRice.webp' }, baseSpirit: 'RUM' },
      { id: 204, name: 'Black Truffle Negroni', image: { url: '/menu/matchaMartini.webp' }, baseSpirit: 'GIN' },
      { id: 205, name: 'Velvet Manhattan', image: { url: '/menu/tepacheSour.webp' }, baseSpirit: 'RUM' },
    ],
  },
  {
    name: 'Signature Cocktails',
    menuType: 'SIGNATURE',
    drinks: [
      { id: 301, name: 'Mango Sticky Rice', image: { url: '/menu/mangoStickyRice.webp' }, baseSpirit: 'RUM' },
      { id: 302, name: 'Matcha Martini', image: { url: '/menu/matchaMartini.webp' }, baseSpirit: 'VODKA' },
      { id: 303, name: 'Tepache Sour', image: { url: '/menu/tepacheSour.webp' }, baseSpirit: 'SOUR' },
      { id: 304, name: 'Calamansi Sunset', image: { url: '/menu/mangoStickyRice.webp' }, baseSpirit: 'GIN' },
      { id: 305, name: 'Ube Cloud', image: { url: '/menu/matchaMartini.webp' }, baseSpirit: 'RUM' },
    ],
  },
  {
    name: 'Mocktail Menu',
    menuType: 'MOCKTAILS',
    drinks: [
      { id: 401, name: 'Citrus Bloom', image: { url: '/menu/tepacheSour.webp' }, baseSpirit: 'SPRITZERS' },
      { id: 402, name: 'Berry Basil Fizz', image: { url: '/menu/mangoStickyRice.webp' }, baseSpirit: 'SPRITZERS' },
      { id: 403, name: 'Tropical Iced Tea', image: { url: '/menu/matchaMartini.webp' }, baseSpirit: 'WINE-BASED' },
      { id: 404, name: 'Virgin Mojito', image: { url: '/menu/tepacheSour.webp' }, baseSpirit: 'SPRITZERS' },
      { id: 405, name: 'Cucumber Cooler', image: { url: '/menu/mangoStickyRice.webp' }, baseSpirit: 'SPRITZERS' },
    ],
  },
]

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
    <div className="border-b-[0.5px] border-[#C2C4C7] py-4">
      <button onClick={onToggle} className="flex items-center justify-between w-full">
        <p className="text-xs text-[#9A9A9A] tracking-wider font-semibold uppercase">{label}</p>
        <ChevronDown
          className={`size-4 transition-transform duration-300 ease-in-out ${
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
          <div className="flex flex-col gap-3 pt-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default function MenuPage() {
  const [isBaseSpiritOpen, setIsBaseSpiritOpen] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [selectedBaseSpirits, setSelectedBaseSpirits] = useState<BaseSpirit[]>([])
  const [selectedMenu, setSelectedMenu] = useState<MenuFilter | null>(null)

  useEffect(() => {
    const nav = document.querySelector('nav')
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden'
      if (nav) nav.style.display = 'none'
    } else {
      document.body.style.overflow = 'unset'
      if (nav) nav.style.display = 'flex'
    }
    return () => {
      document.body.style.overflow = 'unset'
      if (nav) nav.style.display = 'flex'
    }
  }, [isMobileFilterOpen])

  const toggleBaseSpirit = (baseSpirit: BaseSpirit) => {
    setSelectedBaseSpirits((prev) =>
      prev.includes(baseSpirit) ? prev.filter((item) => item !== baseSpirit) : [...prev, baseSpirit],
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
          className={`text-xs font-bold text-black underline underline-offset-4 hover:text-primary transition-opacity duration-500 ${
            hasActiveFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          CLEAR ALL
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
            className={`text-left text-xs transition-colors duration-200 ${
              selectedBaseSpirits.includes(spirit)
                ? 'font-bold text-black'
                : 'text-[#3E3E3E] hover:text-black'
            }`}
          >
            {spirit}
          </button>
        ))}
      </AccordionSection>

      <AccordionSection
        label="Menu"
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen((v) => !v)}
      >
        {menuFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => toggleMenu(filter)}
            className={`text-left text-xs transition-colors duration-200 ${
              selectedMenu === filter ? 'font-bold text-black' : 'text-[#3E3E3E] hover:text-black'
            }`}
          >
            {filter}
          </button>
        ))}
      </AccordionSection>

    </div>
  )

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden text-foreground px-24 py-16 pt-30 flex justify-center">
        {/* The Background Image */}
        <Image
          src="/placeholder.png"
          alt="Hero background"
          fill
          unoptimized
          priority
          className="object-cover -z-10"
          sizes="100vw"
        />

        {/* The Content Overlay */}
        <div className="relative z-10 flex h-full w-full max-w-7xl">
          <div className="flex h-auto flex-col gap-1 lg:gap-3">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3.5">
                <h1 className={`text-6xl font-semibold flex flex-col gap-2 text-black`}>
                  MEET OUR
                  <span className={`${parrisienne.className} text-primary text-8xl leading-14`}>
                    menu
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filter Desktop (desktop) */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start">
            {filterSections}
          </aside>

          {/* Main Drink Display */}
          <main className="flex-1">
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-6 py-3 border border-black mb-8"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
              {hasActiveFilters && (
                <div className="flex items-center justify-center size-6 bg-black rounded-full">
                  <h1 className="text-white text-xs">{filteredDrinks.length}</h1>
                </div>
              )}
            </button>

            {hasActiveFilters ? (
              <div className="flex flex-col gap-8">
                <h2 className="text-3xl lg:text-4xl text-[#3E3E3E] font-medium">
                  {selectedFilterTitle}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                  {filteredDrinks.map((drink) => (
                    <div key={drink.id} className="group cursor-pointer">
                      <div className="aspect-3/4 overflow-hidden bg-gray-100 mb-4">
                        <img
                          src={drink.image.url}
                          alt={drink.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <p className={`${playfair.className} text-xl lg:text-2xl text-black`}>
                        {drink.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-16 lg:gap-24">
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
          </main>
        </div>
      </div>

      {/* FILTER DRAWER */}
      <div
        className={`fixed inset-0 z-200 lg:hidden bg-white flex flex-col transition-transform duration-500 ease-in-out ${
          isMobileFilterOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-black uppercase tracking-tight">Filters</h3>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="size-6 text-black" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 pt-8">{filterSections}</div>

        {/* Footer Action */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            disabled={!hasActiveFilters}
            className={`w-full bg-green-600 disabled:bg-green-600/40 text-white py-4 rounded-md font-semibold tracking-wide hover:bg-green-600/90 transition-colors active:scale-[0.98] ${hasActiveFilters ? '' : 'disabled'}`}
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