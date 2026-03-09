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
        <div className="navbar-content">
          {/* Desktop Navigation */}
          <div className="hidden md:flex w-full h-full justify-between">
            <Link href="/" className="navbar-logo flex items-center h-full">
              <img src="/logo.svg" alt="Logo" className="w-28" />
            </Link>

            <ul className="navbar-links h-full">
              <li className="h-full">
                <Link href="/" className="flex items-center h-full px-2">
                  Home
                </Link>
              </li>
              <li className="h-full">
                <Link href="/about" className="flex items-center h-full px-2">
                  Our Story
                </Link>
              </li>
              <li className="h-full">
                <Link href="/menu" className="flex items-center h-full px-2">
                  Our Menu
                </Link>
              </li>
              <li className="h-full">
                <Link href="/cocktail-tasting" className="flex items-center h-full px-2">
                  Cocktail Tasting
                </Link>
              </li>

              <Link
                href="/public"
                className="self-center inline-flex w-fit items-center justify-center px-5 py-3 font-medium !text-white bg-primary rounded-sm"
              >
                Get My Custom Quote
              </Link>
            </ul>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden w-full items-center justify-between px-4">
            <Link href="/" className="navbar-logo flex items-center">
              <img src="logo.svg" alt="Tipsy Trails" className="w-22" />
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
          <div className="flex flex-col gap-8 w-full">
            <ul>
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
            <div className="flex flex-col gap-3 w-full">
              <Button href="/" className="w-full justify-center">
                Get My Custom Quote
              </Button>
              <Button href="/" variant="skeleton" className="w-full justify-center">
                Book a Tasting Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
