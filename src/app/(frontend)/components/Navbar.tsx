'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './Button'

export function Navbar() {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [hasMounted, setHasMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const ticking = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    setWindowHeight(window.innerHeight)
    const rafId = requestAnimationFrame(() => setHasMounted(true))

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking.current = false
        })
        ticking.current = true
      }
    }

    const handleResize = () => setWindowHeight(window.innerHeight)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const heroMidPoint = windowHeight / 2

  const navbarClasses = useMemo(() => {
    let classes = hasMounted ? 'navbar is-visible' : 'navbar is-hidden'
    if (scrollY >= heroMidPoint) classes += ' is-white'
    if (isMobileMenuOpen) classes += ' is-menu-open'
    return classes
  }, [scrollY, windowHeight, hasMounted, isMobileMenuOpen, heroMidPoint])

  return (
    <>
      <nav className={navbarClasses}>
        <div className="navbar-content px-4 md:px-8 lg:px-8 xl:px-0">
          {/* Desktop Navigation */}
          <div className="hidden md:flex w-full h-full justify-between items-center gap-4">
            <Link href="/" className="navbar-logo flex items-center shrink-0">
              <img src="/logo.svg" alt="Logo" className="w-24 lg:w-32" />
            </Link>

            {/* Links Container */}
            <div className="flex items-center gap-4 lg:gap-10">
              <ul className="navbar-links flex items-center gap-4! lg:gap-8 text-sm! md:text-base! lg:text-lg! lg:font-medium whitespace-nowrap">
                <li>
                  <Link href="/" className="px-1 hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="px-1 hover:text-primary transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="px-1 hover:text-primary transition-colors">
                    Our Menu
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cocktail-tasting"
                    className="px-1 hover:text-primary transition-colors"
                  >
                    Tasting
                  </Link>
                </li>
              </ul>

              <Link
                href="#inquiry"
                className="inline-flex items-center justify-center px-6 py-3 lg:px-6 lg:py-3 font-base! lg:font-medium !text-white bg-primary rounded-sm text-sm md:text-base! lg:text-base whitespace-nowrap"
              >
                Get My Custom Quote
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden w-full h-full items-center justify-between">
            <Link href="/" className="navbar-logo flex items-center">
              <img src="logo.svg" alt="Tipsy Trails" className="w-24" />
            </Link>
            <button
              className={`navbar-hamburger ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="hamburger-line hamburger-line-top" />
              <span className="hamburger-line hamburger-line-bottom" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className="mobile-menu-wrapper">
        <div className={`mobile-menu${isMobileMenuOpen ? ' is-open' : ''}`}>
          <div className="flex flex-col gap-10 w-full">
            <ul className="flex flex-col gap-6 text-5xl">
              <li>
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  Our Journey
                </Link>
              </li>
              <li>
                <Link href="/menu" onClick={() => setIsMobileMenuOpen(false)}>
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/cocktail-tasting" onClick={() => setIsMobileMenuOpen(false)}>
                  Cocktail Tasting
                </Link>
              </li>
            </ul>
            <div className="flex flex-col gap-4 w-full">
              <Button
                href="/"
                className="w-full justify-center py-5 text-xl font-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get My Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
