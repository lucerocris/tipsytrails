'use client'

import Image from 'next/image'
import { parrisienne, playfair } from '@/app/(frontend)/fonts'
import { ChevronDown } from 'lucide-react'
import { CocktailCarousel } from '@/app/(frontend)/components/CocktailCarousel'
import { useMemo, useState } from 'react'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const baseSpirits = ['VODKA', 'GIN', 'RUM', 'WHISKY', 'SOUR', 'WINE-BASED', 'SPRITZERS'] as const
const menuFilters = ['CLASSIC', 'PREMIUM', 'SIGNATURE', 'MOCKTAILS'] as const

type BaseSpirit = (typeof baseSpirits)[number]
type MenuFilter = (typeof menuFilters)[number]

type MenuDrink = {
  id: number
  name: string
  image: {
    url: string
  }
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
      { id: 103, name: 'Whiskey Sour', image: { url: '/menu/tepacheSour.webp' }, baseSpirit: 'SOUR' },
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
      { id: 303, name: 'Tepache Sour', image: { url: '/menu/tepacheSour.webp' }, baseSpirit: 'SOUR' },
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

export default function MenuPage() {
  const toggleTransitionStyle = {
    transition:
      'transform 0.8s cubic-bezier(0.18, 0.71, 0.11, 1), background-color 0.8s cubic-bezier(0.18, 0.71, 0.11, 1)',
  }

  const [isBaseSpiritOpen, setIsBaseSpiritOpen] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [selectedBaseSpirits, setSelectedBaseSpirits] = useState<BaseSpirit[]>([])
  const [selectedMenu, setSelectedMenu] = useState<MenuFilter | null>(null)

  const toggleBaseSpirit = (baseSpirit: BaseSpirit) => {
    setSelectedBaseSpirits((prev) => {
      if (prev.includes(baseSpirit)) {
        return prev.filter((item) => item !== baseSpirit)
      }

      return [...prev, baseSpirit]
    })
  }

  const toggleMenu = (menu: MenuFilter) => {
    setSelectedMenu((prev) => (prev === menu ? null : menu))
  }

  const filteredDrinks = useMemo(() => {
    const drinks = menuCategories
      .filter((category) => (selectedMenu ? category.menuType === selectedMenu : true))
      .flatMap((category) => category.drinks)

    if (!selectedBaseSpirits.length) {
      return drinks
    }

    return drinks.filter((drink) => selectedBaseSpirits.includes(drink.baseSpirit))
  }, [selectedBaseSpirits, selectedMenu])

  const selectedFilterTitle = useMemo(() => {
    const labels = [
      ...selectedBaseSpirits.map((value) => value.toLowerCase().replace(/(^|[-\s])\w/g, (match) => match.toUpperCase())),
      ...(selectedMenu
        ? [selectedMenu.toLowerCase().replace(/(^|[-\s])\w/g, (match) => match.toUpperCase())]
        : []),
    ]

    return labels.length ? labels.join(', ') : 'All Cocktails'
  }, [selectedBaseSpirits, selectedMenu])

  const hasActiveFilters = selectedBaseSpirits.length > 0 || Boolean(selectedMenu)

  return (
    <>
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

      <div className="py-20">
        <div className="flex gap-10 max-w-7xl mx-auto">
          <div className="w-66 shrink-0">
            <div className="sticky top-20 flex flex-col w-full gap-2 pt-4">
              <p className="text-sm text-[#5E6366]">FILTERS</p>

              <div className="flex flex-col w-full">
                <div className="border-b-[0.5px] border-[#C2C4C7] py-2.5">
                  <button
                    type="button"
                    onClick={() => setIsBaseSpiritOpen((prev) => !prev)}
                    className="self-center inline-flex items-center justify-between w-full px-1 bg-transparent cursor-pointer"
                    style={toggleTransitionStyle}
                  >
                    <p className="text-xs text-[#9A9A9A]">BASE SPIRIT</p>
                    <ChevronDown
                      strokeWidth={1}
                      width={18}
                      className={`text-[#9A9A9A] ${isBaseSpiritOpen ? '' : '-rotate-90'}`}
                      style={toggleTransitionStyle}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-[800ms] ${
                      isBaseSpiritOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.18, 0.71, 0.11, 1)' }}
                  >
                    <div className="flex flex-col gap-2 px-1 pt-4 pb-2">
                      {baseSpirits.map((baseSpirit) => (
                        <button
                          key={baseSpirit}
                          type="button"
                          onClick={() => toggleBaseSpirit(baseSpirit)}
                          className={`text-left text-xs leading-normal text-black ${
                            selectedBaseSpirits.includes(baseSpirit)
                              ? 'font-semibold text-[#3E3E3E]'
                              : 'font-normal text-black'
                          }`}
                        >
                          {baseSpirit}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-b-[0.5px] border-[#C2C4C7] py-2.5">
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="self-center inline-flex items-center justify-between w-full px-1 bg-transparent cursor-pointer"
                    style={toggleTransitionStyle}
                  >
                    <p className="text-xs text-[#9A9A9A]">MENU</p>
                    <ChevronDown
                      strokeWidth={1}
                      width={18}
                      className={`text-[#9A9A9A] ${isMenuOpen ? '' : '-rotate-90'}`}
                      style={toggleTransitionStyle}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-[800ms] ${
                      isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.18, 0.71, 0.11, 1)' }}
                  >
                    <div className="flex flex-col gap-2 px-1 pt-4 pb-2">
                      {menuFilters.map((menuType) => (
                        <button
                          key={menuType}
                          type="button"
                          onClick={() => toggleMenu(menuType)}
                          className={`text-left text-xs leading-normal text-black ${
                            selectedMenu === menuType
                              ? 'font-semibold text-[#3E3E3E]'
                              : 'font-normal text-black'
                          }`}
                        >
                          {menuType}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {hasActiveFilters ? (
            <div className="flex w-full flex-col gap-8">
              <h2 className="text-4xl text-[#3E3E3E] font-medium">{selectedFilterTitle}</h2>

              {filteredDrinks.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {filteredDrinks.map((drink) => (
                    <div key={drink.id} className="flex flex-col gap-2 h-[434px]">
                      <div
                        className="w-full h-full bg-[url('/menu/mangoStickyRice.webp')] bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('${drink.image.url}')` }}
                      />
                      <p className={`${playfair.className} text-black text-xl font-medium`}>{drink.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-base text-[#5E6366]">No cocktails available for this filter yet.</p>
              )}
            </div>
          ) : (
            <div className="flex w-full flex-col gap-20">
              {menuCategories.map((category) => (
                <CocktailCarousel
                  key={category.name}
                  categoryName={category.name}
                  drinks={category.drinks}
                  baseUrl={baseUrl}
                  cardsPerView={3}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}