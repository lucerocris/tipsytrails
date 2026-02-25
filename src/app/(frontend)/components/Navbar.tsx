'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [hasMounted, setHasMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const lastScrollY = useRef(0)
  const direction = useRef('down')
  const ticking = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    setWindowHeight(window.innerHeight)
    const rafId = requestAnimationFrame(() => setHasMounted(true))

    const handleScroll = () => {
      const current = window.scrollY
      direction.current = current > lastScrollY.current ? 'down' : 'up'
      lastScrollY.current = current

      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrollY(current)
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
  const heroEndPoint = windowHeight * 0.85

  const navbarClasses = useMemo(() => {
    let classes = 'navbar is-visible'

    if (scrollY < windowHeight) {
      if (scrollY >= heroMidPoint) classes += ' is-white'
      if (direction.current === 'down' && scrollY >= heroEndPoint) {
        classes = classes.replace(' is-visible', ' is-hidden')
      }
    } else {
      if (direction.current === 'up') {
        classes += ' is-white'
      } else {
        classes = classes.replace(' is-visible', ' is-hidden')
      }
    }

    if (!hasMounted) {
      classes = classes.replace(' is-visible', ' is-hidden')
    }

    if (isMobileMenuOpen) {
      classes = classes.replace(' is-hidden', ' is-visible')
      classes += ' is-menu-open'
    }

    return classes
  }, [scrollY, windowHeight, hasMounted, isMobileMenuOpen, heroMidPoint, heroEndPoint])

  return (
    <nav className={navbarClasses}>
      <div className="navbar-content">
        {/* Desktop Navigation */}
        {/* CHANGED: Added h-full, removed items-center to allow stretching */}
        <div className="hidden md:flex w-full h-full justify-between">
          {/* CHANGED: Added flex items-center h-full to center logo vertically */}
          <Link href="/public" className="navbar-logo flex items-center h-full">
            <img src="/logo.svg" alt="Logo" className="w-28" />
          </Link>

          {/* CHANGED: Added h-full to UL */}
          <ul className="navbar-links h-full">
            <li className="h-full">
              {/* CHANGED: Added flex items-center h-full px-2 to make link full height */}
              <Link href="/public" className="flex items-center h-full px-2">
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

            {/* CHANGED: Added self-center so the button doesn't stretch to full height */}
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
          <button
            className={`navbar-hamburger ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line hamburger-line-top" />
            <span className="hamburger-line hamburger-line-bottom" />
          </button>
          <Link href="/public" className="navbar-logo">
            Logo
          </Link>
          <div style={{ width: '35px' }} /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li>
              <Link href="/public" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
