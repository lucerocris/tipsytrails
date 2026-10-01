'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from './Button'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Our Story' },
  { href: '/menu', label: 'Our Menu' },
  { href: '/cocktail-tasting', label: 'Cocktail Tasting' },
]

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNearFooter, setIsNearFooter] = useState(false)

  // The footer carries its own navigation, so the bar steps aside once it shows.
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const observer = new IntersectionObserver(([entry]) => setIsNearFooter(entry.isIntersecting), {
      rootMargin: '0px 0px -40% 0px',
    })
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-16 bg-paper border-b border-line transition-transform duration-300 ease-(--ease-out) ${
          isNearFooter && !isMobileMenuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <nav className="wrap h-full flex items-center justify-between gap-6" aria-label="Main">
          <Link href="/" className="flex items-center shrink-0" onClick={closeMenu}>
            <img src="/logo.svg" alt="Tipsy Trails" className="w-24 lg:w-28" />
          </Link>

          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors duration-150 hover:text-primary ${
                    pathname === link.href ? 'text-primary' : 'text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Button href="#inquiry" className="hidden md:inline-flex">
            Get My Custom Quote
          </Button>

          <button
            type="button"
            className="md:hidden icon-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`grid grid-cols-3 gap-[3px] transition-transform duration-300 ease-(--ease-out) ${
                isMobileMenuOpen ? 'rotate-45' : ''
              }`}
              aria-hidden="true"
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="size-[3px] rounded-full bg-ink" />
              ))}
            </span>
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-paper flex flex-col justify-between px-4 pt-10 pb-6 transition-[opacity,visibility] duration-300 ease-(--ease-out) ${
          isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="flex flex-col">
          {links.map((link, i) => (
            <li key={link.href} className="border-b border-line">
              <Link
                href={link.href}
                onClick={closeMenu}
                className="flex items-baseline gap-4 py-5"
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                <span className="meta">{String(i + 1).padStart(2, '0')}</span>
                <span className={`display-m ${pathname === link.href ? 'accent' : ''}`}>
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Button href="#inquiry" className="w-full" onClick={closeMenu}>
          Get My Custom Quote
        </Button>
      </div>
    </>
  )
}
